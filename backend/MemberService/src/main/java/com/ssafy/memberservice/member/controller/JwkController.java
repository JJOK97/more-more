package com.ssafy.memberservice.member.controller;

import com.nimbusds.jose.jwk.JWKSet;
import com.ssafy.memberservice.global.security.RsaKeyHolder;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;

import java.security.interfaces.RSAPublicKey;

@RestController
@RequiredArgsConstructor
public class JwkController {
    private final RsaKeyHolder rsaKeyHolder;

    @GetMapping("/.moremore/jwks.json")
    public String getJwks() {
        RSAKey jwk = new RSAKey.Builder((RSAPublicKey) rsaKeyHolder.getPublicKey())
                .keyID("moremore")
                .build();
        return new JWKSet(jwk).toJSONObject().toJSONString();
    }
}
