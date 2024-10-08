import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostView from '@/components/postView/PostView';
import CommentItem from './CommentItem'; // 분리한 컴포넌트 import
import ContentInput from './ContentInput'; // ContentInput 컴포넌트 import
import '@/assets/css/post/Post.css';
import useGroupName from '@/store/useGroupName';
import { getDatas } from '../feed/getData';
import { likePost, unlikePost, checkLikeStatus, getLikeCount } from '@/api/postApi'; // 좋아요 관련 API 함수 import
import { getComments, createComment } from '@/api/commentApi';

const Post = () => {
	const { setGroupName } = useGroupName();
	const { groupId, postId } = useParams(); // groupId와 postId를 URL에서 추출
	const [groupInfo, setGroupInfo] = useState(null);
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [content, setContent] = useState(''); // 댓글 내용을 저장할 상태

	// 좋아요 관련 상태 추가
	const [memberId, setMemberId] = useState(null);
	const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 관리
	const [likeCount, setLikeCount] = useState(0); // 좋아요 수 관리

	// 댓글 목록 불러오기
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const commentsData = await getComments(postId);
				setComments(commentsData); // 가져온 댓글 리스트 설정
			} catch (error) {
				console.error('Error fetching comments:', error);
			}
		};

		fetchComments();
	}, [postId]);

	// 댓글 생성 핸들러
	const handleCreateComment = async () => {
		if (!content.trim()) return; // 빈 내용일 경우 처리 안함

		try {
			const newComment = await createComment(postId, memberId, content);
			setComments((prevComments) => [...prevComments, newComment]); // 기존 댓글 목록에 새 댓글 추가
			setContent(''); // 입력창 초기화
		} catch (error) {
			console.error('Error creating comment:', error);
		}
	};

	// 그룹 정보를 불러오는 useEffect
	useEffect(() => {
		const getGroupInfo = async () => {
			try {
				const url = `https://j11a605.p.ssafy.io/api/club/${groupId}`;
				const data = await getDatas(url);
				setGroupInfo(data);
			} catch (error) {
				console.error('Error fetching group info:', error);
			}
		};
		getGroupInfo();
	}, [groupId]);

	// groupInfo가 업데이트될 때, groupName 상태를 업데이트
	useEffect(() => {
		if (groupInfo && groupInfo.clubName) {
			setGroupName(groupInfo.clubName);
		}
	}, [groupInfo, setGroupName]);

	// 게시물 데이터와 좋아요 상태 및 좋아요 수 불러오기
	useEffect(() => {
		const fetchPost = async () => {
			const url = `https://j11a605.p.ssafy.io/api/posting/${postId}/aboutPosting`;
			const data = await getDatas(url);
			setPost(data);
		};
		fetchPost();
	}, [groupId, postId]);

	// 로컬 스토리지에서 memberId 가져오기
	useEffect(() => {
		const storedMemberId = localStorage.getItem('memberId');
		if (storedMemberId) {
			setMemberId(storedMemberId);
		} else {
			console.error('No memberId found in localStorage');
		}
	}, []);

	// 좋아요 수와 상태 확인
	useEffect(() => {
		const fetchLikeData = async () => {
			try {
				if (post && memberId) {
					// 좋아요 수 가져오기
					const likeCountData = await getLikeCount(post.postingId);
					setLikeCount(likeCountData); // 가져온 좋아요 수 설정

					// 좋아요 여부 확인
					const status = await checkLikeStatus(post.postingId, memberId);
					setIsLiked(status); // true or false
				}
			} catch (error) {
				console.error('Failed to fetch like data:', error);
			}
		};

		if (memberId) {
			fetchLikeData();
		}
	}, [post, memberId]);

	// 좋아요 버튼 클릭 핸들러
	const handleLike = async () => {
		try {
			if (isLiked) {
				// 좋아요 취소 API 호출
				await unlikePost(post.postingId, memberId);
				setIsLiked(false); // 좋아요 상태 변경
				setLikeCount((prevCount) => prevCount - 1); // 좋아요 수 감소
			} else {
				// 좋아요 추가 API 호출
				await likePost(post.postingId, memberId);
				setIsLiked(true); // 좋아요 상태 변경
				setLikeCount((prevCount) => prevCount + 1); // 좋아요 수 증가
			}
		} catch (error) {
			console.error('Failed to toggle like status:', error);
		}
	};

	if (!post) {
		return <div>Loading...</div>; // 로딩 상태 표시
	}

	return (
		<div className="post-page-container">
			<PostView
				key={post.postId}
				post={post}
				isLiked={isLiked}
				likeCount={likeCount}
				onLike={handleLike} // 좋아요 토글 함수 전달
			/>

			<div className="comment-list-area">
				{comments.length > 0 ? (
					comments.map((comment, index) => (
						<CommentItem
							key={index}
							comment={comment}
						/>
					))
				) : (
					<p>댓글이 없습니다.</p>
				)}
			</div>

			{/* 댓글 입력 박스 */}
			<div className="comment-input-area">
				<ContentInput
					content={content}
					setContent={setContent}
				/>
				<img
					className="comment-input-button"
					src="/feed/paper-airplane.svg"
					alt="댓글쓰기"
					onClick={handleCreateComment} // 클릭 시 댓글 작성 핸들러 호출
				/>
			</div>
		</div>
	);
};

export default Post;
