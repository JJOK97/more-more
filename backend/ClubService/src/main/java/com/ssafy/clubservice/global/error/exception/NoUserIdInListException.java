package com.ssafy.clubservice.global.error.exception;

import com.ssafy.clubservice.global.error.ErrorCode;

public class NoUserIdInListException extends AbstractErrorException{
    public NoUserIdInListException(ErrorCode errorCode) {
        super(errorCode);
    }
}
