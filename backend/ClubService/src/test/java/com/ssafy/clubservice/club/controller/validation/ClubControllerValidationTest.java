package com.ssafy.clubservice.club.controller.validation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.clubservice.club.controller.ClubController;
import com.ssafy.clubservice.club.controller.dto.request.ClubCreateRequest;
import com.ssafy.clubservice.club.controller.dto.request.ClubUpdateRequest;
import com.ssafy.clubservice.club.infrastructure.repository.ClubRepository;
import com.ssafy.clubservice.club.infrastructure.repository.ParticipantRepository;
import com.ssafy.clubservice.club.mapper.ClubObjectMapper;
import com.ssafy.clubservice.club.mapper.ParticipantObjectMapper;
import com.ssafy.clubservice.club.service.ClubService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ClubController.class)
public class ClubControllerValidationTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClubService clubService;

    @MockBean
    private ClubObjectMapper clubObjectMapper;

    @MockBean
    private ClubRepository clubRepository;

    @MockBean
    private ParticipantObjectMapper participantObjectMapper;

    @MockBean
    private ParticipantRepository participantRepository;

    private ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @DisplayName("새로운 모임을 등록할 때, 모임코드는 필수값이다.")
    @Test
    void createClubClubCodeValidationTest() throws Exception {
        ClubCreateRequest clubCreateRequest = ClubCreateRequest.builder()
                .creatorId(1L)
                .clubName("name1")
                .clubIntro("intro1")
                .dues(1000L)
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
                .andExpect(jsonPath("$.code").value("1000"))
                .andExpect(jsonPath("$.message").value("모임 코드는 필수값입니다."));
    }

    @DisplayName("새로운 모임을 등록할 때, 회비는 0원보다 커야한다.")
    @Test
    void createClubDueValidationTest() throws Exception {
        ClubCreateRequest clubCreateRequest = ClubCreateRequest.builder()
                .creatorId(1L)
                .clubName("name1")
                .clubIntro("intro1")
                .dues(0L)
                .clubCode("code1")
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
                .andExpect(jsonPath("$.code").value("1000"))
                .andExpect(jsonPath("$.message").value("회비는 0원보다 커야합니다."));
    }


    @DisplayName("새로운 모임을 등록할 때, 생성자는 필수값이다.")
    @Test
    void createClubCreatorValidationTest() throws Exception {
        ClubCreateRequest clubCreateRequest = ClubCreateRequest.builder()
                .clubName("name1")
                .clubIntro("intro1")
                .dues(1000L)
                .clubCode("code1")
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
                .andExpect(jsonPath("$.code").value("1000"))
                .andExpect(jsonPath("$.message").value("모임 생성자 ID는 필수값입니다."));
    }


    @DisplayName("모임을 수정할 때, 모임코드는 필수값이다.")
    @Test
    void updateClubClubCodeValidationTest() throws Exception {
        ClubUpdateRequest clubupdateRequest = ClubUpdateRequest.builder()
                .clubName("name1")
                .clubId(1L)
                .dues(1000L)
                .build();

        mockMvc.perform(put("/api/club/test1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(clubupdateRequest))
                )
                .andExpect(jsonPath("$.code").value("1000"))
                .andExpect(jsonPath("$.message").value("모임 코드는 필수값입니다."));
    }

    @DisplayName("모임을 수정할 때,, 회비는 0원보다 커야한다.")
    @Test
    void updateClubDueValidationTest() throws Exception {
        ClubUpdateRequest clubupdateRequest = ClubUpdateRequest.builder()
                .clubName("name1")
                .clubId(1L)
                .dues(0L)
                .clubCode("code1")
                .build();

        mockMvc.perform(put("/api/club/test1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(clubupdateRequest))
                )
                .andExpect(jsonPath("$.code").value("1000"))
                .andExpect(jsonPath("$.message").value("회비는 0원보다 커야합니다."));
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
