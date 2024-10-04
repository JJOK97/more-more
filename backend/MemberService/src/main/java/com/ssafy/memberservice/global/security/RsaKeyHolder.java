package com.ssafy.memberservice.global.security;

import org.springframework.stereotype.Component;

import java.security.*;

@Component
public class RsaKeyHolder {
    private KeyPairGenerator keyPairGenerator;
    private KeyPair keyPair;


    public RsaKeyHolder() throws NoSuchAlgorithmException {
        keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(2048);
        keyPair = keyPairGenerator.generateKeyPair();
    }

    public PrivateKey getPrivateKey(){
        return keyPair.getPrivate();
    }
    public PublicKey getPublicKey(){
        return keyPair.getPublic();
    }
}
