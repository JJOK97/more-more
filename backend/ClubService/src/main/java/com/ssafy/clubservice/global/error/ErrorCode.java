package com.ssafy.clubservice.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // INPUT VALIDATION
    INVALID_ARGUMENT(BAD_REQUEST, "1000", "입력값이 잘못됐습니다");

    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;

}
