package com.ssafy.clubservice.club.service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Profile({"local", "prod"})
public class RandomUUIDHolder implements UUIDHolder {

    @Override
    public String getUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
