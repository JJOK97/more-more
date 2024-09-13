package com.ssafy.clubservice.club.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import com.ssafy.clubservice.club.controller.dto.response.ClubReadResponse;
import com.ssafy.clubservice.club.controller.dto.response.ParticipantCreateResponse;
import com.ssafy.clubservice.club.service.domain.Club;
import lombok.Data;
import org.assertj.core.api.Assertions;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
    private final ObjectMapper objectMapper = new ObjectMapper();

    @DisplayName("클럽 조회시, 클럽 정보와 참석자 정보를 반환한다.")
    @Test
    void getClub() throws Exception {
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
        assertThat(participants).extracting("participantId").containsExactly(1, 8);
        assertThat(participants).extracting("clubCode").containsExactly("test1", "test1");
    }



    private static MockMultipartFile getMockMultipartFile() {
        return new MockMultipartFile(
                "홍길동전 썸네일 이미지",
                "thumbnail.png",
                MediaType.IMAGE_PNG_VALUE,
                "thumbnail".getBytes()
        );
    }
}