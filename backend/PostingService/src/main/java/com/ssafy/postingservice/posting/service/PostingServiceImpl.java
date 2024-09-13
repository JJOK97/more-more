package com.ssafy.postingservice.posting.service;


import com.ssafy.postingservice.posting.infrastructure.repository.PostingRepository;
import com.ssafy.postingservice.posting.service.domain.Posting;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostingServiceImpl implements PostingService {
    private final PostingRepository postingRepository;

    public Posting create(Posting posting){
        return postingRepository.save(posting);
    }

    @Override
    public List<Posting> findByClubCode(String clubCode) {
        return postingRepository.findByClubCode(clubCode);
    }


}
