package com.ssafy.clubservice.global.validator;


import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CustomParticipantsValidator.class)
public @interface ParticipantListValid {
    String message() default "사용자 ID가 존재하지않습니다";
    Class[] groups() default {};
    Class[] payload() default {};

}
