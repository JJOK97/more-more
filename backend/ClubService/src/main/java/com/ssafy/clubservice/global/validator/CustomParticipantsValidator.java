package com.ssafy.clubservice.global.validator;

import com.ssafy.clubservice.club.controller.dto.request.ParticipantCreateRequest;
import com.ssafy.clubservice.club.service.domain.Club;
import com.ssafy.clubservice.global.error.ErrorCode;
import com.ssafy.clubservice.global.error.exception.NoUserIdInListException;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;
import java.util.List;

import static com.ssafy.clubservice.global.error.ErrorCode.*;


@Component
public class CustomParticipantsValidator implements ConstraintValidator<ParticipantListValid, List<ParticipantCreateRequest>> {
    @Override
    public boolean isValid(List<ParticipantCreateRequest> clubs, ConstraintValidatorContext constraintValidatorContext) {
        if(clubs == null || clubs.isEmpty()){
            throw new NoUserIdInListException(NO_USER_ID_IN_LIST);
        }
        return true;
    }
}