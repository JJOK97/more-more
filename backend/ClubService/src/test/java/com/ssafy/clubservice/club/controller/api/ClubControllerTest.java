package com.ssafy.clubservice.club.controller.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.jayway.jsonpath.JsonPath;
import com.ssafy.clubservice.club.controller.dto.request.ClubUpdateRequest;
import com.ssafy.clubservice.club.controller.dto.response.ClubReadResponse;
import com.ssafy.clubservice.club.controller.dto.response.ParticipantCreateResponse;
import com.ssafy.clubservice.club.controller.dto.response.ParticipantReadResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase
@SqlGroup({
        @Sql(value = "/schema-h2.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD),
        @Sql(value = "/sql/club-controller-test-data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD),
        @Sql(value = "/sql/delete-all-data.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
})
@ActiveProfiles("test")
class ClubControllerTest {
    @Autowired
    private MockMvc mockMvc;
    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @DisplayName("모임 코드로 모임 조회시, 모임 정보와 참석자 정보를 반환한다.")
    @Test
    void findClub() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/api/club/test1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.clubId").isNumber())
                .andExpect(jsonPath("$.clubImage").value("https://test.s3.test.amazonaws.com/test/test1"))
                .andExpect(jsonPath("$.dues").value(1000))
                .andExpect(jsonPath("$.clubCode").value("test1"))
                .andExpect(jsonPath("$.clubName").value("test1"))
                .andExpect(jsonPath("$.clubIntro").value("test1"))
                .andExpect(jsonPath("$.participants.length()").value(2))
                .andReturn();
        String response = mvcResult.getResponse().getContentAsString();
        List<ParticipantCreateResponse> participants = JsonPath.parse(response).read("$.participants");
        assertThat(participants).extracting("participantId").containsExactlyInAnyOrder(1, 8);
        assertThat(participants).extracting("clubCode").containsExactlyInAnyOrder("test1", "test1");
    }

    @DisplayName("전체 모임 조회시, 멤버 ID에 해당하는 모임의 코드, 이름, 소개 문구를 모두 반환한다.")
    @Test
    void findClubs() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/api/club?memberId=1"))
                .andExpect(status().isOk())
                .andReturn();
        List<ClubReadResponse> clubReadResponses = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), new TypeReference<List<ClubReadResponse>>() {});
        assertThat(clubReadResponses).extracting("clubName").containsExactlyInAnyOrder("test1", "test2", "test3");
        assertThat(clubReadResponses).extracting("clubCode").containsExactlyInAnyOrder("test1", "test2", "test3");
        assertThat(clubReadResponses).extracting("clubIntro").containsExactlyInAnyOrder("test1", "test2", "test3");
        assertThat(clubReadResponses)
                .flatExtracting(ClubReadResponse::getParticipants)
                .extracting("participantId")
                .containsExactlyInAnyOrder(1L, 2L, 3L);
        assertThat(clubReadResponses)
                .flatExtracting(ClubReadResponse::getParticipants)
                .extracting("userId")
                .containsExactly(1L, 1L, 1L);
    }

    @DisplayName("모임 코드로 전체 멤버 조회 시, 멤버ID, 참석자ID를 반환한다.")
    @Test
    void findParticipants() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/api/club/test1/participants"))
                .andExpect(status().isOk())
                .andReturn();
        List<ParticipantReadResponse> participantReadResponses = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), new TypeReference<List<ParticipantReadResponse>>() {});
        assertThat(participantReadResponses).size().isEqualTo(2);
        assertThat(participantReadResponses).extracting("participantId").containsExactlyInAnyOrder(1L, 8L);
        assertThat(participantReadResponses).extracting("userId").containsExactlyInAnyOrder(1L, 6L);
        assertThat(participantReadResponses).extracting("clubCode").containsExactlyInAnyOrder("test1", "test1");
    }

    @DisplayName("모임 정보 변경 시, 변경된 회비와 이름을 반환한다.")
    @Test
    void updateClubs() throws Exception {
        ClubUpdateRequest clubUpdateRequest = ClubUpdateRequest.builder()
                .clubId(1L)
                .clubCode("test1")
                .clubName("test11")
                .dues(1500L)
                .build();
        mockMvc.perform(put("/api/club/test1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(clubUpdateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.clubName").value("test11"))
                .andExpect(jsonPath("$.dues").value(1500L));
        mockMvc.perform(get("/api/club/test1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.clubCode").value("test1"))
                .andExpect(jsonPath("$.clubName").value("test11"))
                .andExpect(jsonPath("$.dues").value(1500L));
    }
    @DisplayName("이미지 이름 변경 시, 변경된 이미지 URL을 반환한다.")
    @Test
    void updateClubImage() throws Exception {
        mockMvc.perform(multipart("/api/club/test1/image")
                .file(getMockMultipartFile()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.clubImage").value("https://test.s3.test.amazonaws.com/test/test1"));

    }


    private static MockMultipartFile getMockMultipartFile() {
        return new MockMultipartFile(
                "file",
                "thumbnail.png",
                MediaType.IMAGE_PNG_VALUE,
                "thumbnail".getBytes()
        );
    }
}