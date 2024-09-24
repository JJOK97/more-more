package com.ssafy.postingservice.posting.infrastructure.repository;


import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostImageEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PostImageRepositoryImpl implements PostImageRepository {
    private final PostingImageMybatisMapper postingImageMybatisMapper;

    @Override
    public void save(PostImageEntity entity) {
        postingImageMybatisMapper.savePostingImage(entity);
    }

    @Override
    public List<PostImageEntity> findByPostingId(Long postingId) {
        // postImageRepository를 사용하여 게시물 ID로 이미지들을 조회
        List<PostImageEntity> postImages = postingImageMybatisMapper.findByPostingId(postingId);

        return postImages;
    }

    @Override
    public void deleteByPostingIdAndImageUrls(String url) {
       postingImageMybatisMapper.deleteByPostingIdAndImageUrls(url);
    }

    @Override
    public void deleteByPostingId(Long postingId) {
        postingImageMybatisMapper.deleteByPostingId(postingId);
    }
}
