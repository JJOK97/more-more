package com.ssafy.clubservice.club.controller.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.clubservice.club.controller.dto.request.ClubCreateRequest;
import com.ssafy.clubservice.club.controller.dto.request.ParticipantCreateRequest;
import com.ssafy.clubservice.club.controller.dto.response.ParticipantCreateResponse;
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
        @Sql(value = "/sql/club-create-controller-test-data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD),
        @Sql(value = "/sql/delete-all-data.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
})
@ActiveProfiles("test")
public class ClubCreateControllerTest {
    @Autowired
    private MockMvc mockMvc;
    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @DisplayName("모임 생성 시 생성된 모임 정보와 참석자 정보를 반환한다.")
    @Test
    void createClub() throws Exception {
        ClubCreateRequest clubCreateRequest = ClubCreateRequest.builder()
                .clubName("name1")
                .clubIntro("intro1")
                .dues(1000L)
                .creatorId(1L)
                .build();
        mockMvc.perform(multipart("/api/club")
                        .file(getMockMultipartFile())
                        .file(new MockMultipartFile(
                                "clubCreateRequest", // Request part name (same as @RequestPart)
                                "clubCreateRequest",
                                "application/json",
                                objectMapper.writeValueAsString(clubCreateRequest).getBytes() // Attach the JSON part
                        ))
                        .contentType(MediaType.MULTIPART_FORM_DATA) // Specify the content type as multipart form
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.clubId").value(2L))
                .andExpect(jsonPath("$.clubName").value("name1"))
                .andExpect(jsonPath("$.clubCode").value("tttt"))
                .andExpect(jsonPath("$.clubIntro").value("intro1"))
                .andExpect(jsonPath("$.dues").value(1000L))
                .andExpect(jsonPath("$.clubImage").value("https://test.s3.test.amazonaws.com/test/tttt"))
                .andExpect(jsonPath("$.participants[0].participantId").isNumber())
                .andExpect(jsonPath("$.participants[0].userId").value(1L))
                .andExpect(jsonPath("$.participants[0].clubRole").value("CREATOR"));
    }

    @DisplayName("참석자 추가 시 생성된 참석자 ID와 소속된 모임 코드를 반환한다.")
    @Test
    void addParticipant() throws Exception {
        ParticipantCreateRequest participant1 = new ParticipantCreateRequest(1L);
        ParticipantCreateRequest participant2 = new ParticipantCreateRequest(2L);
        List<ParticipantCreateRequest> participants = List.of(participant1, participant2);
        MvcResult mvcResult = mockMvc.perform(post("/api/club/test1/participants")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(participants)))
                .andExpect(status().isCreated())
                .andReturn();
        List<ParticipantCreateResponse> participantResponses = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), new TypeReference<List<ParticipantCreateResponse>>() {});
        assertThat(participantResponses).extracting("userId").contains(1L, 2L);
        assertThat(participantResponses).extracting("participantId").contains(1L, 2L);
        assertThat(participantResponses).extracting("clubCode").contains("test1", "test1");
        assertThat(participantResponses).extracting("acceptanceStatus").contains("WAITING", "WAITING");
        assertThat(participantResponses).extracting("clubRole").contains("PARTICIPANT", "PARTICIPANT");
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
