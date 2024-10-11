package com.ssafy.clubservice.club.service.domain;

import com.ssafy.clubservice.club.enumeration.AcceptanceStatus;
import com.ssafy.clubservice.club.enumeration.ClubRole;
import com.ssafy.clubservice.global.error.exception.NoSuchAcceptanceStatusException;
import com.ssafy.clubservice.global.error.exception.NoSuchClubRoleException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class ParticipantTest {

    @Test
    @DisplayName("관리자를 생성 시 모임에 바로 참여되며, 역할은 Creator가 부여된다.")
    void createCreator() {
        Participant creator = Participant.createClubCreator("test", 1L);
        assertThat(creator.getClubCode()).isEqualTo("test");
        assertThat(creator.getUserId()).isEqualTo(1L);
        assertThat(creator.getClubRole()).isEqualTo(ClubRole.CREATOR);
        assertThat(creator.getAcceptanceStatus()).isEqualTo(AcceptanceStatus.ACCEPTED);
    }

    @Test
    @DisplayName("참여자를 생성 시 대기 상태가 되며, 역할은 Participant가 부여된다.")
    void createParticipant() {
        Participant participant = Participant.createClubParticipant("test", 1L);

        assertThat(participant.getClubCode()).isEqualTo("test");
        assertThat(participant.getUserId()).isEqualTo(1L);
        assertThat(participant.getClubRole()).isEqualTo(ClubRole.PARTICIPANT);
        assertThat(participant.getAcceptanceStatus()).isEqualTo(AcceptanceStatus.WAITING);
    }

    @Test
    @DisplayName("참여자 거절 시 참여자의 상태는 REFUSED가 된다.")
    void rejectParticipant(){
        Participant participant = Participant.createClubParticipant("test", 1L);
        participant.rejectParticipant();
        assertThat(participant.getClubCode()).isEqualTo("test");
        assertThat(participant.getUserId()).isEqualTo(1L);
        assertThat(participant.getClubRole()).isEqualTo(ClubRole.PARTICIPANT);
        assertThat(participant.getAcceptanceStatus()).isEqualTo(AcceptanceStatus.REFUSED);
    }

    @Test
    @DisplayName("모임의 멤버 역할은 PARTICIPANT와 CREATOR 중 하나여야한다")
    void validateNormalMemberRole() {
        String memberRole1 = "PARTICIPANT";
        String memberRole2 = "CREATOR";

        assertThat(Participant.isValidClubRole(memberRole1)).isTrue();
        assertThat(Participant.isValidClubRole(memberRole2)).isTrue();
    }

    @Test
    @DisplayName("모임의 멤버 역할은 PARTICIPANT와 CREATOR가 아니라면 NoSuchClubRoleException이 발생한다.")
    void validateAbNormalMemberRole() {
        String memberRole = "PARTICIPAN";
        assertThatThrownBy(() -> Participant.isValidClubRole(memberRole)).isInstanceOf(NoSuchClubRoleException.class);
    }

    @Test
    @DisplayName("모임의 수락 상태는 WAITING, ACCEPTED, REFUSED 중 하나여야한다")
    void validateNormalAcceptanceStatus() {
        String acceptanceStatus1 = "WAITING";
        String acceptanceStatus2 = "ACCEPTED";
        String acceptanceStatus3 = "REFUSED";
        assertThat(Participant.isValidAcceptanceStatus(acceptanceStatus1)).isTrue();
        assertThat(Participant.isValidAcceptanceStatus(acceptanceStatus2)).isTrue();
        assertThat(Participant.isValidAcceptanceStatus(acceptanceStatus3)).isTrue();
    }

    @Test
    @DisplayName("모임의 수락 상태는 WAITING, ACCEPTED, REFUSED 중 하나가 아니면 NoSuchAcceptanceStatusException이 발생한다.")
    void validateAbNormalAcceptanceStatus() {
        String acceptanceStatus = "TEST";
        assertThatThrownBy(() -> Participant.isValidAcceptanceStatus(acceptanceStatus)).isInstanceOf(NoSuchAcceptanceStatusException.class);
    }
}