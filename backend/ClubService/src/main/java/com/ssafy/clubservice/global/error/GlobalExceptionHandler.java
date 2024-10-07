package com.ssafy.clubservice.global.error;

import com.ssafy.clubservice.global.error.exception.NoSuchAcceptanceStatusException;
import com.ssafy.clubservice.global.error.exception.NoSuchClubRoleException;
import com.ssafy.clubservice.global.error.exception.NoUserIdInListException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.ssafy.clubservice.global.error.ErrorCode.*;


@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(NoUserIdInListException e) {
        log.error(e.getMessage(), e);
        ErrorCode errorCode = e.getErrorCode();
        ErrorResponse errorResponse = new ErrorResponse(errorCode.getCode(), e.getMessage());
        return new ResponseEntity<>(errorResponse, errorCode.getHttpStatus());
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleNoSuchAcceptanceStatusException(NoSuchAcceptanceStatusException e) {
        log.error(e.getMessage(), e);
        ErrorCode errorCode = e.getErrorCode();
        ErrorResponse errorResponse = new ErrorResponse(errorCode.getCode(), e.getMessage());
        return new ResponseEntity<>(errorResponse, errorCode.getHttpStatus());
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleNoSuchClubRoleException(NoSuchClubRoleException e) {
        log.error(e.getMessage(), e);
        ErrorCode errorCode = e.getErrorCode();
        ErrorResponse errorResponse = new ErrorResponse(errorCode.getCode(), e.getMessage());
        return new ResponseEntity<>(errorResponse, errorCode.getHttpStatus());
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error(e.getMessage(), e);
        ErrorCode errorCode = INVALID_ARGUMENT;
        ErrorResponse errorResponse = new ErrorResponse(errorCode.getCode(), e.getBindingResult().getFieldError().getDefaultMessage());
        return new ResponseEntity<>(errorResponse, errorCode.getHttpStatus());
    }
}
