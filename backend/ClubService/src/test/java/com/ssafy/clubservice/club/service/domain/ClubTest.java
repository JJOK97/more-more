package com.ssafy.clubservice.club.service.domain;

import com.ssafy.clubservice.club.service.UUIDHolder;
import com.ssafy.clubservice.fake.FakeUUIDHolder;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class ClubTest {
    private UUIDHolder uuidHolder = new FakeUUIDHolder();

    @DisplayName("클럽 객체는 클럽 코드를 생성할 수 있다.")
    @Test
    void generateClubCode(){
        Club club = Club.builder()
                .clubId(1L)
                .dues(10L)
                .clubName("test")
                .build();
        Club generatedClub =  club.generateClubCode(uuidHolder);
        assertThat(generatedClub.getClubId()).isEqualTo(1L);
        assertThat(generatedClub.getDues()).isEqualTo(10L);
        assertThat(generatedClub.getClubName()).isEqualTo("test");
        assertThat(generatedClub.getClubCode()).isEqualTo("tttt");
    }

    @DisplayName("클럽 객체는 이미지 이름을 변경할 수 있다.")
    @Test
    void changeImageName(){
        Club club = Club.builder()
                .clubId(1L)
                .dues(10L)
                .clubName("test")
                .build();
        club.changeImageName("test");
        assertThat(club.getClubId()).isEqualTo(1L);
        assertThat(club.getDues()).isEqualTo(10L);
        assertThat(club.getClubName()).isEqualTo("test");
        assertThat(club.getClubImage()).isEqualTo("test");
    }

    @DisplayName("클럽은 이름을 변경할 수 있다.")
    @Test
    void updateName(){
        Club club = Club.builder()
                .clubId(1L)
                .clubCode("11")
                .dues(10L)
                .clubName("11")
                .build();
        Club updateData = Club.builder()
                .clubId(1L)
                .dues(10L)
                .clubName("22")
                .build();
        club.update(updateData);
        assertThat(club.getClubId()).isEqualTo(1L);
        assertThat(club.getDues()).isEqualTo(10L);
        assertThat(club.getClubName()).isEqualTo("22");
    }
    @DisplayName("클럽 회비를 변경할 수 있다.")
    @Test
    void updateDues(){
        Club club = Club.builder()
                .clubId(1L)
                .clubCode("11")
                .dues(10L)
                .clubName("11")
                .build();
        Club updateData = Club.builder()
                .clubId(1L)
                .dues(20L)
                .clubName("11")
                .build();
        club.update(updateData);
        assertThat(club.getClubId()).isEqualTo(1L);
        assertThat(club.getDues()).isEqualTo(20L);
        assertThat(club.getClubName()).isEqualTo("11");
    }
    @DisplayName("클럽 이름과 회비를 변경할 수 있다.")
    @Test
    void updateNameAndDues(){
        Club club = Club.builder()
                .clubId(1L)
                .dues(10L)
                .clubCode("11")
                .clubName("11")
                .build();
        Club updateData = Club.builder()
                .clubId(1L)
                .dues(20L)
                .clubCode("11")
                .clubName("22")
                .build();
        club.update(updateData);
        assertThat(club.getClubId()).isEqualTo(1L);
        assertThat(club.getDues()).isEqualTo(20L);
        assertThat(club.getClubName()).isEqualTo("22");
    }
}

