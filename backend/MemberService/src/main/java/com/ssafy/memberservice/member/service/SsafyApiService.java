package com.ssafy.memberservice.member.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import java.util.HashMap;
import java.util.Map;

@Service
public class SsafyApiService {

    // YML에서 API 키 값을 가져옵니다.
    @Value("${ssafy.api.key}")
    private String apiKey;

    public SsafyApiService() {
        // 기본 생성자
    }

    public String fetchUserKeyFromApi(String email) {
        String url = "https://finopenapi.ssafy.io/ssafy/api/v1/member/";

        // RestTemplate 인스턴스를 여기서 직접 생성
        RestTemplate restTemplate = new RestTemplate();

        // 요청 본문 생성
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("apiKey", apiKey);  // YML에서 가져온 API 키 사용
        requestBody.put("userId", email);

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 엔티티 생성
        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

        // API 호출 및 응답 받기
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);

        // 응답에서 userKey 추출
        Map<String, Object> responseBody = response.getBody();
        return (String) responseBody.get("userKey");
    }
}
