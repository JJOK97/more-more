package com.ssafy.postingservice.posting.infrastructure.s3;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.net.URL;

@Slf4j
@Component
@RequiredArgsConstructor
@Profile({"local", "prod"})
public class S3ConnectorImpl implements S3Connector {
    private final S3Client s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Value("${cloud.aws.region.static}")
    private String regionName;

    @Value("${aws.club-image.prefix}")
    private String prefix;

    public String upload(String filename, MultipartFile multipartFile){
        String key = prefix + filename;
        try {
            return putS3(key, multipartFile);
        } catch (S3Exception | IOException e) {
            log.error("Error uploading file to S3: {}", e.getMessage());
            throw new RuntimeException(e); 
            // TODO Image upload Exception 발생 및 핸들링 로직 추가
        }
    }

    @Override
    public String getImageURL(String clubCode) {
        return "https://" + bucketName + ".s3." + regionName + ".amazonaws.com/" + prefix + clubCode;
    }

    private String putS3(String key, MultipartFile file) throws IOException {
        PutObjectRequest objectRequest = getPutObjectRequest(key, file.getContentType());
        RequestBody rb = getFileRequestBody(file);
        s3Client.putObject(objectRequest, rb);
        return findUploadKeyUrl(key);
    }

    private PutObjectRequest getPutObjectRequest(String key, String contentType) {
        log.info("타입: {}", contentType);
        return PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key) // TODO invitationCode?
                .contentType(contentType)
                .build();
    }

    private RequestBody getFileRequestBody(MultipartFile file) throws IOException {
        return RequestBody.fromInputStream(file.getInputStream(), file.getSize());
    }

    private String findUploadKeyUrl(String key) {
        GetUrlRequest request = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        URL url = s3Client.utilities().getUrl(request);
        return url.toString();
    }

    public void deleteFile(String filename) {
        String key = prefix + filename;
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);
        } catch (S3Exception e) {
            throw new RuntimeException("Error deleting file from S3: " + e.getMessage());
        }
    }

}
