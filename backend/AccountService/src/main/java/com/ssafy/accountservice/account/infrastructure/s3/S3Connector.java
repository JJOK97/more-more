package com.ssafy.accountservice.account.infrastructure.s3;

import org.springframework.web.multipart.MultipartFile;

public interface S3Connector {
    String upload(String filename, MultipartFile file);
    void deleteFile(String filename);
    String getImageURL(String clubCode);

}