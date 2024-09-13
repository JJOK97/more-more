package com.ssafy.clubservice.club.controller.springfake;


import com.ssafy.clubservice.club.infrastructure.s3.S3Connector;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.multipart.MultipartFile;

@Component
@Profile("test")
public class FakeS3Connector implements S3Connector {

    private final String bucketName = "test";
    private final String regionName = "test";
    private final String prefix = "test/";

    @Override
    public String upload(String filename, MultipartFile file) {
        return "";
    }

    @Override
    public void deleteFile(String filename) {

    }

    @Override
    public String getImageURL(String clubCode) {
        return "https://" + bucketName + ".s3." + regionName + ".amazonaws.com/" + prefix + clubCode;
    }
}
