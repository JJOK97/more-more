import React from 'react';

const formatDate = (dateString) => {
	const commentDate = new Date(dateString);
	const now = new Date();
	const diffInMs = now - commentDate; // 현재 시간과 댓글 시간 차이 (ms)
	const diffInHours = diffInMs / (1000 * 60 * 60); // 시간 차이로 변환
	const diffInMinutes = diffInMs / (1000 * 60); // 분 차이로 변환

	if (diffInHours < 1) {
		const minutesAgo = Math.floor(diffInMinutes);
		return `${minutesAgo}분 전`;
	} else if (diffInHours < 24) {
		const hoursAgo = Math.floor(diffInHours);
		return `${hoursAgo}시간 전`;
	} else {
		const month = commentDate.getMonth() + 1; // 0-indexed
		const day = commentDate.getDate();
		return `${month}월 ${day}일`;
	}
};

const CommentItem = ({ comment }) => {
	return (
		<div className="comment-detail-area">
			<img
				className="comment-detail-profile"
				src="/feed/profile_icon3.png"
				alt="프로필 이미지"
			/>
			<div className="comment-detail-data">
				<div className="comment-detail-name">{comment.memberName}</div>
				<div className="comment-detail-date">{formatDate(comment.commentDate)}</div>
			</div>
			<div className="comment-detail-content">{comment.commentContent}</div>
		</div>
	);
};

export default CommentItem;
