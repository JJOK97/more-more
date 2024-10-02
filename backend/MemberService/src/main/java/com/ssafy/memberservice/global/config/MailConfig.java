package com.ssafy.memberservice.global.config;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {
    @Value("${spring.mail.username}")
    private String userName;
    @Value("${spring.mail.password}")
    private String password;
    @Bean
    public JavaMailSenderImpl javaMailSender() {
        JavaMailSenderImpl r = new JavaMailSenderImpl();
        r.setHost("smtp.gmail.com");
        r.setPort(587);
        r.setUsername(userName);	// gmail계정을 설정합니다.
        r.setPassword(password);  // <--- 발행된 암호를 여기에 넣어 주세요.
        r.setDefaultEncoding("UTF-8");

        Properties prop = new Properties();
        prop.put("mail.smtp.starttls.enable", true);
        prop.put("mail.smtp.auth", true);
        prop.put("mail.smtp.ssl.checkserveridentity", true);
        prop.put("mail.smtp.ssl.trust","*");
        prop.put("mail.smtp.ssl.protocols", "TLSv1.2");

        r.setJavaMailProperties(prop);
        return r;
    }
}
