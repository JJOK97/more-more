import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PostView = ({ post }) => {
	const location = useLocation(); // 현재 경로 가져오기
	const [isFeedPage, setIsFeedPage] = useState(false); // 경로 상태를 관리

	useEffect(() => {
		// 경로가 /group/:groupId인지 확인하여 상태 업데이트
		const pathArray = location.pathname.split('/');
		console.log(pathArray);
		if (pathArray.length === 3 && pathArray[1] === 'group') {
			setIsFeedPage(true); // /group/:groupId 형식일 때 feed 페이지로 간주
		} else {
			setIsFeedPage(false);
		}
	}, [location.pathname]); // 경로가 바뀔 때마다 실행

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

			{/* feed-post-area를 링크로 감싸고, /group/:groupId일 때만 Link를 사용 */}
			{isFeedPage ? (
				<Link
					to={`/group/${post.groupId}/${post.postId}`}
					className="feed-post-area"
				>
					<div className="feed-post-content">{post.postContent}</div>
					<img
						className="feed-post-image"
						src={post.postImage}
						alt="사진"
					/>
				</Link>
			) : (
				<div className="feed-post-area">
					<div className="feed-post-content">{post.postContent}</div>
					<img
						className="feed-post-image"
						src={post.postImage}
						alt="사진"
					/>
				</div>
			)}

			<div className="feed-att-area">
				<div className="feed-att-like">
					<img
						className="feed-att-like-icon"
						src="/feed/Heart.svg"
						alt="좋아요 아이콘"
					/>
					<div className="feed-att-like-count">{post.likeCount}</div>
				</div>
				<div className="feed-att-comment">
					<img
						className="feed-att-comment-icon"
						src="/feed/chat.svg"
						alt="댓글 아이콘"
					/>
					<div className="feed-att-comment-count">{post.commentCount}</div>
				</div>
			</div>
		</div>
	);
};

export default PostView;
