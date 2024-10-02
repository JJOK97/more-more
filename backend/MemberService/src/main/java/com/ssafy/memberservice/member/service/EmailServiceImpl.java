package com.ssafy.memberservice.member.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    @Override
    public void sendEmail(String to, String subject, String text) throws MessagingException {
        // MIME 타입의 이메일 메시지 생성
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true);  // HTML 형식 지원을 위해 true

        try {
            mailSender.send(message);
        } catch (MailException e) {
            // 예외 메시지 로그 출력
            e.printStackTrace();
            throw new RuntimeException("이메일 전송에 실패했습니다. 메일 설정을 확인해주세요.");
        }


    }
}