package com.ssafy.clubservice.club.service.domain;

import com.ssafy.clubservice.club.enumeration.AcceptanceStatus;
import com.ssafy.clubservice.club.enumeration.ClubRole;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class ParticipantTest {

    @Test
    @DisplayName("관리자를 생성 시 모임에 바로 참여되며, 역할은 Creato가 부여된다.")
    void createCreator() {
        Participant creator = Participant.createClubCreator(1L, 1L);

        assertThat(creator.getClubId()).isEqualTo(1L);
        assertThat(creator.getUserId()).isEqualTo(1L);
        assertThat(creator.getClubRole()).isEqualTo(ClubRole.CREATOR);
        assertThat(creator.getAcceptanceStatus()).isEqualTo(AcceptanceStatus.ACCEPTED);
    }

    @Test
    @DisplayName("참여자를 생성 시 대기 상태가 되며, 역할느 Participant가 부여된다.")
    void createParticipant() {
        Participant creator = Participant.createClubParticipant(1L, 1L);

        assertThat(creator.getClubId()).isEqualTo(1L);
        assertThat(creator.getUserId()).isEqualTo(1L);
        assertThat(creator.getClubRole()).isEqualTo(ClubRole.PARTICIPANT);
        assertThat(creator.getAcceptanceStatus()).isEqualTo(AcceptanceStatus.WAITING);
    }

}