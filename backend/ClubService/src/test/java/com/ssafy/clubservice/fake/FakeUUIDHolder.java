package com.ssafy.clubservice.fake;

import com.ssafy.clubservice.club.service.UUIDHolder;

public class FakeUUIDHolder implements UUIDHolder {
    @Override
    public String getUUID() {
        return "tttt";
    }
}
