package com.ssafy.clubservice.global.error.exception;

import com.ssafy.clubservice.global.error.ErrorCode;

public class NoSuchClubRoleException extends AbstractErrorException {

    public NoSuchClubRoleException(ErrorCode errorCode) {
        super(errorCode);
    }
}
