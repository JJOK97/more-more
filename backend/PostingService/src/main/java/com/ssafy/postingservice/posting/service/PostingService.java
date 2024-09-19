package com.ssafy.postingservice.posting.service;


import com.ssafy.postingservice.posting.service.domain.Posting;

import java.util.List;

public interface PostingService {
    public Posting create(Posting posting);
    List<Posting> findByClubCode(String clubCode);


}
