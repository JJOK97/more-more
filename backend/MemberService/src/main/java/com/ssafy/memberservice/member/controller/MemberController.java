package com.ssafy.memberservice.member.controller;


import com.ssafy.memberservice.member.controller.dto.request.MemberCreateRequest;
import com.ssafy.memberservice.member.controller.dto.response.MemberAllGetResponse;
import com.ssafy.memberservice.member.controller.dto.response.MemberGetResponse;
import com.ssafy.memberservice.member.service.EmailService;
import com.ssafy.memberservice.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
@Tag(name = "Member", description = "회원 서비스 API")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    private final RedisTemplate<String, String> redisTemplate;
    private final EmailService emailService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "회원가입 API", description = "계좌번호, 주소, 이메일, 핸드폰번호, 비밀번호, 생년월일(yyyy-mm-dd),이름, 이미지파일로, 은행명 회원가입. (access token)")
    public String registerMember(@ModelAttribute MemberCreateRequest memberRequest) {
        try {
            memberService.registerMember(memberRequest);
            return "회원가입이 완료되었습니다.";
        } catch (Exception e) {
            e.printStackTrace();
            return "회원가입에 실패했습니다.";
        }
    }


    @GetMapping("/{memberId}")
    @Operation(summary = "회원정보 조회 API", description = "memberID로 계좌번호, 주소, 이메일, 핸드폰번호, 생년월일(yyyy-mm-dd),이름, 이미지파일 은행명을 받음. (access token)")
    public MemberGetResponse getMember(@PathVariable Long memberId) {
        return memberService.findByMemberId(memberId);
    }


    @GetMapping
    @Operation(summary = "회원전체 정보 조회 API", description = "memberID 핸드폰번호 이름등을 받음 (access token)")
    public List<MemberAllGetResponse> getAllMember() {
        return memberService.findAllMembers();
    }


    // 이메일 인증 코드 발송 API
    @PostMapping("/send-verification-code")
    @Operation(summary = "이메일 인증 코드 발송 API", description = "사용자의 이메일로 인증번호를 발송")
    public ResponseEntity<String> sendVerificationCode(@RequestParam String email) {
        try {
            // 인증 번호 생성
            String verificationCode = generateVerificationCode();
            // 이메일 제목 고정
            String subject = "모아모아 : 회원가입 인증번호";

            // 이미지 URL
            String imageUrl = "https://jumsun-bucket.s3.ap-northeast-2.amazonaws.com/member/ssh2957@naver.com_ca819d52-99fd-4dd9-bad1-a80fd8c7aa9b";

            // HTML 이메일 본문 작성
            String content = "<html><body>"
                    + "<h2>모아모아 : 회원가입 인증번호</h2>"
                    + "<p>안녕하세요? 아래의 인증 번호를 입력해 주세요:</p>"
                    + "<h3>" + verificationCode + "</h3>"
                    + "<p>감사합니다.</p>"
                    + "<img src='" + imageUrl + "' alt='인증 이미지' style='max-width: 100%; height: auto;'/>"  // 이미지 추가
                    + "</body></html>";

            // 이메일 발송 (이미지 URL을 사용)
            emailService.sendEmail(email, subject, content);

            // Redis에 인증 번호 저장 (유효시간 5분)
            redisTemplate.opsForValue().set(email, verificationCode, 5, TimeUnit.MINUTES);

            return ResponseEntity.ok("인증 번호가 이메일로 발송되었습니다.");
        } catch (MessagingException e) {
            log.error("발송실패", e);
            // MessagingException 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이메일 발송에 실패했습니다.");
        } catch (Exception e) {
            log.error("예외", e);
            // 기타 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버에서 문제가 발생했습니다.");
        }
    }

    // 이메일 인증 번호 검증 API
    @PostMapping("/verify-code")
    @Operation(summary = "이메일 인증 코드 검증 API", description = "이메일과 인증번호를 확인하고 검증")
    public ResponseEntity<Boolean> verifyCode(@RequestParam String email, @RequestParam String verificationCode) {
        String storedCode = redisTemplate.opsForValue().get(email);

        if (storedCode != null && storedCode.equals(verificationCode)) {
            return ResponseEntity.ok(true); // 인증 성공
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false); // 인증 실패
        }
    }

    // 인증 번호 생성 메서드 (6자리 숫자)
    private String generateVerificationCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

    @GetMapping("/{ssafyAccountNumber}/account")
    @Operation(summary = "계좌번호로 이름조회", description = "계좌번호로 이름 조회하는 api")
    String getMemberByAccountNumber(@PathVariable("ssafyAccountNumber") String accountNumber) {
        return memberService.findName(accountNumber);
    };

    @GetMapping("/{ssafyAccountNumber}/existence")
    @Operation(summary = "계좌번호가 존재 하는지 확인", description = "계좌번호로 이름 조회하는 api")
    Boolean checkAccount(@PathVariable("ssafyAccountNumber") String accountNumber) {
        return memberService.checkByAccountNumber(accountNumber);
    };

    @PutMapping("/{memberId}/fcm-token")
    @Operation(summary = "fcm토큰 발급 api", description = "프론트가 준 fcm 토큰을 db에 넣어줌")
    public ResponseEntity<String> updateFcmToken(@PathVariable("memberId") Long memberId, @RequestParam("fcmToken") String fcmToken) {
        memberService.updateFcmToken(memberId, fcmToken);
        return new ResponseEntity<>("OK", HttpStatus.OK); // 성공 시 OK 반환
    };

    @GetMapping("{memberId}/fcm-token")
    @Operation(summary = "memberId로 fcm토큰 조회", description = "memberid로 fcm token 조회하는 api")
    public String getFcmTokenByUserId(@PathVariable("memberId") Long memberId) {
        return memberService.getFcmTokenByMemberId(memberId);
    }









}
