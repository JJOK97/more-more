package com.ssafy.memberservice.member.controller;


import com.ssafy.memberservice.member.controller.dto.request.MemberCreateRequest;
import com.ssafy.memberservice.member.controller.dto.response.MemberGetResponse;
import com.ssafy.memberservice.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
@Tag(name = "Member", description = "회원 서비스 API")
public class MemberController {

    private final MemberService memberService;



    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "회원가입 API", description = "계좌번호, 주소, 이메일, 핸드폰번호, 비밀번호, 생년월일(yyyy-mm-dd),이름, 이미지파일로 회원가입. (access token)")
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
    @Operation(summary = "회원정보 조회 API", description = "memberID로 계좌번호, 주소, 이메일, 핸드폰번호, 생년월일(yyyy-mm-dd),이름, 이미지파일을 받음. (access token)")
    public MemberGetResponse getMember(@PathVariable Long memberId) {

        return memberService.findByMemberId(memberId);
    }



}
