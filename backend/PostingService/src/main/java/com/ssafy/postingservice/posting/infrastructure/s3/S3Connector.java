package com.ssafy.postingservice.posting.infrastructure.s3;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface S3Connector {
    String upload(String filename, MultipartFile file);
    void deleteFile(String filename);
    String getImageURL(String clubCode);


}
