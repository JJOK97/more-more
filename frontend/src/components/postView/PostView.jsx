import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const formatDate = (dateString) => {
	const postDate = new Date(dateString);
	const now = new Date();
	const diffInMs = now - postDate; // 현재 시간과 게시물 시간 차이 (ms)
	const diffInHours = diffInMs / (1000 * 60 * 60); // 시간 차이로 변환
	const diffInMinutes = diffInMs / (1000 * 60); // 분 차이로 변환

	if (diffInHours < 1) {
		const minutesAgo = Math.floor(diffInMinutes);
		return `${minutesAgo}분 전`;
	} else if (diffInHours < 24) {
		const hoursAgo = Math.floor(diffInHours);
		return `${hoursAgo}시간 전`;
	} else {
		const year = postDate.getFullYear();
		const month = String(postDate.getMonth() + 1).padStart(2, '0'); // 0-indexed
		const day = String(postDate.getDate()).padStart(2, '0');
		return `${year}.${month}.${day}`;
	}
};

const PostView = ({ post }) => {
	const location = useLocation(); // 현재 경로 가져오기
	const [isFeedPage, setIsFeedPage] = useState(false); // 경로 상태를 관리

	useEffect(() => {
		// 경로가 /group/:groupId인지 확인하여 상태 업데이트
		const pathArray = location.pathname.split('/');
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
						<div className="feed-profile-date">{formatDate(post.date)}</div>
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
					<div className={`feed-post-content ${isFeedPage ? 'line-clamp' : ''}`}>{post.postContent}</div>
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
