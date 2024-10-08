import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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

const PostView = ({ post, onDelete }) => {
	const location = useLocation(); // 현재 경로 가져오기
	const navigate = useNavigate(); // 페이지 이동을 위한 훅
	const [isFeedPage, setIsFeedPage] = useState(false); // 경로 상태를 관리

	useEffect(() => {
		// 경로가 /group/:groupId 또는 /group/:groupId/search인지 확인하여 상태 업데이트
		const pathArray = location.pathname.split('/');
		if (
			(pathArray.length === 3 && pathArray[1] === 'group') ||
			(pathArray.length === 4 && pathArray[1] === 'group' && pathArray[3] === 'search')
		) {
			setIsFeedPage(true); // /group/:groupId 또는 /group/:groupId/search 형식일 때 feed 페이지로 간주
		} else {
			setIsFeedPage(false);
		}
	}, [location.pathname]); // 경로가 바뀔 때마다 실행

	const handleDelete = async () => {
		const confirmDelete = window.confirm('게시글을 삭제하시겠습니까?');
		if (confirmDelete) {
			try {
				const response = await fetch(`https://j11a605.p.ssafy.io/api/posting/${post.postingId}`, {
					method: 'DELETE',
				});
				if (response.ok) {
					console.log('Post deleted successfully');
					// 삭제 후 추가 동작 (예: 부모 컴포넌트에서 상태 업데이트)
					if (onDelete) {
						onDelete(post.postingId);
					}

					// 피드 페이지라면 새로고침
					if (isFeedPage) {
						window.location.reload(); // 페이지 새로고침
					} else {
						// 포스트 페이지라면 피드 페이지로 이동
						navigate(`/group/${post.clubCode}`); // 피드 페이지로 이동
					}
				} else {
					console.error('Error deleting post:', response.statusText);
				}
			} catch (error) {
				console.error('Error deleting post:', error);
			}
		}
	};

	return (
		<div className="feed-area">
			<div className="feed-head-area">
				<div className="feed-profile-area">
					<img
						className="feed-profile-image"
						src={post.memberInfo.profileImageUrl}
						alt="프로필"
					/>
					<div className="feed-profile-data">
						<div className="feed-profile-name">{post.memberInfo.name}</div>
						<div className="feed-profile-date">{formatDate(post.postingCreatedTime)}</div>
					</div>
				</div>
				<div className='feed-head-right'>
					<div className="feed-account-history">#{post.accountHistory}</div>
					{/* 삭제 버튼 추가 */}
					<button
						onClick={handleDelete}
						className="feed-delete-button"
					>
						삭제
					</button>
				</div>
			</div>

			{/* feed-post-area를 링크로 감싸고, /group/:groupId일 때만 Link를 사용 */}
			{isFeedPage ? (
				<Link
					to={`/group/${post.clubCode}/${post.postingId}`}
					className="feed-post-area"
				>
					<div className={`feed-post-content ${isFeedPage ? 'line-clamp' : ''}`}>{post.postingContent}</div>
					{/* 첫 번째 이미지 렌더링 */}
					{post.imageUrls.length > 0 && (
						<img
							className="feed-post-image"
							src={post.imageUrls[0]}
							alt="사진"
						/>
					)}
				</Link>
			) : (
				<div className="feed-post-area">
					<div className="feed-post-content">{post.postingContent}</div>
					{/* 모든 이미지 렌더링 */}
					{post.imageUrls.map((image, index) => (
						<img
							key={index}
							className="feed-post-image"
							src={image}
							alt={`사진 ${index + 1}`}
						/>
					))}
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
