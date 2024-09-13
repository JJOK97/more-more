
import React from 'react';
import '@/assets/css/feed/Feed.css';
import PostView from '@/components/postView/PostView';
import datas from "@/pages/feed/data.json"

const Feed = () => {
    const posts = datas.posts;
    return (
        <div className='group-feed'>
            <img
                className="group-background-image"
                src="/feed/배경사진.png"
                alt="배경사진"
            />
            <div className="feed-container">
                {posts ? posts.map((post) => (
                    <PostView key={post.postId} post={post} />
                )) : ''}
            </div>
            <img className='feed-write-btn' src='/feed/edit.svg' />
        </div>
    );
};

export default Feed;