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
			{/* 프로필 이미지 */}
			<img
				className="comment-detail-profile"
				src={comment.memberInfo.profileImageUrl || '/feed/default_profile.png'}
				alt="프로필 이미지"
			/>
			{/* 댓글 작성자 정보 */}
			<div className="comment-detail-data">
				<div className="comment-detail-name">{comment.memberInfo.name}</div>
				<div className="comment-detail-date">{formatDate(comment.commentCreatedTime)}</div>
			</div>
			{/* 댓글 내용 */}
			<div className="comment-detail-content">{comment.commentContent}</div>
		</div>
	);
};

export default CommentItem;
