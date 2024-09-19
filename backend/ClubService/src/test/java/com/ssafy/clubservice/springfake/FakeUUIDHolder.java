package com.ssafy.clubservice.springfake;

import com.ssafy.clubservice.club.service.UUIDHolder;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("test")
public class FakeUUIDHolder implements UUIDHolder {
    @Override
    public String getUUID() {
        return "tttt";
    }
}
