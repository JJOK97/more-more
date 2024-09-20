package com.ssafy.clubservice.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // INPUT VALIDATION
    INVALID_ARGUMENT(BAD_REQUEST, "1000",  null),
    NO_SUCH_CLUB_ROLE(BAD_REQUEST, "1001", "역할은 PARTICIPANT, CREATOR 중 하나여야합니다."),
    NO_SUCH_ACCEPTANCE_STATUS(BAD_REQUEST, "1002", "수락 상태는 WAITING, REFUSED, ACCEPTED 중 하나여야합니다."),
    NO_USER_ID_IN_LIST(BAD_REQUEST, "1003", "참석 인원이 존재하지않습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;

}
