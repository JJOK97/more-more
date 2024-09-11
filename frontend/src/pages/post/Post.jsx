import React from "react";
import { useParams } from "react-router-dom";
import datas from "@/pages/feed/data.json"

const Post = () => {
    const { id } = useParams();
    const post = datas.posts[id - 1];
    console.log(id);
    console.log(post);

    return (
		<div className="feed-area">
			<div className="feed-head-area">
				<div className="feed-profile-area">
					<img
						className="feed-profile-image"
						src={post.userProfile}
						alt="프로필"
					/>
					<div className="feed-profile-data">
						<div className="feed-profile-name">{post.userName}</div>
						<div className="feed-profile-date">{post.date}</div>
					</div>
				</div>
				<div className="feed-account-history">#{post.accountHistory}</div>
			</div>
			<div className="feed-post-area">
				<div className="feed-post-content">{post.postContent}</div>
				<img
					className="feed-post-image"
					src={post.postImage}
					alt="사진"
				/>
			</div>
			<div className="feed-att-area">
				<div className="feed-att-like">
					<img className="feed-att-like-icon" src="/feed/Heart.svg" alt="좋아요 아이콘" />
					<div className="feed-att-like-count">{post.likeCount}</div>
				</div>
				<div className="feed-att-comment">
					<img className="feed-att-comment-icon" src="/feed/chat.svg" alt="댓글 아이콘" />
					<div className="feed-att-comment-count">{post.commentCount}</div>
				</div>
			</div>
		</div>
	);
}

export default Post;