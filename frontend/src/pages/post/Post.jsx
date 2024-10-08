import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostView from '@/components/postView/PostView';
import CommentItem from './CommentItem'; // 분리한 컴포넌트 import
import ContentInput from './ContentInput'; // ContentInput 컴포넌트 import
import '@/assets/css/post/Post.css';
import useGroupName from '@/store/useGroupName';
import { getDatas } from '../feed/getData';

const Post = () => {
	const { setGroupName } = useGroupName();
	const { groupId, postId } = useParams(); // groupId와 postId를 URL에서 추출
	const [groupInfo, setGroupInfo] = useState(null);
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [content, setContent] = useState(''); // 댓글 내용을 저장할 상태

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

	useEffect(() => {
		const fetchPost = async () => {
			const url = `https://j11a605.p.ssafy.io/api/posting/${postId}/aboutPosting`;
			const data = await getDatas(url);
			console.log(data);
			setPost(data);
		};
		fetchPost();
	}, [groupId, postId]); 

	if (!post) {
		return <div>Loading...</div>; // 또는 다른 로딩 상태 표시
	}

	return (
		<div className="post-page-container">
			<PostView
				key={post.postId}
				post={post}
			/>

			<div className="comment-list-area">
				{comments.map((comment, index) => (
					<CommentItem
						key={index}
						comment={comment}
					/>
				))}
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
				/>
			</div>
		</div>
	);
};

export default Post;
