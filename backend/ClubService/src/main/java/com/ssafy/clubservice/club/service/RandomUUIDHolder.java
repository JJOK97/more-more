package com.ssafy.clubservice.club.service;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RandomUUIDHolder implements UUIDHolder {

    @Override
    public String getUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
