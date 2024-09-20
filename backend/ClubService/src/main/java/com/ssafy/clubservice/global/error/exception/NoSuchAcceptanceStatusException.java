package com.ssafy.clubservice.global.error.exception;

import com.ssafy.clubservice.global.error.ErrorCode;

public class NoSuchAcceptanceStatusException extends AbstractErrorException{

    public NoSuchAcceptanceStatusException(ErrorCode errorCode) {
        super(errorCode);
    }
}
