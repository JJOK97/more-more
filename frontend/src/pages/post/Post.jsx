import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostView from '@/components/postView/PostView';
import datas from '@/pages/feed/data.json';
import '@/assets/css/post/Post.css';

const Post = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchPost = () => {
			// id가 문자열일 수 있으므로 정수로 변환
			const postIndex = parseInt(id, 10) - 1;
			if (postIndex >= 0 && postIndex < datas.posts.length) {
				const fetchedPost = datas.posts[postIndex];
				setPost(fetchedPost);
				setComments(fetchedPost.comments || []);
			} else {
				console.error('Invalid post id');
				// 여기에 에러 처리 로직을 추가할 수 있습니다 (예: 404 페이지로 리디렉션)
			}
		};

		fetchPost();
	}, [id]);

	if (!post) {
		return <div>Loading...</div>; // 또는 다른 로딩 상태 표시
	}

	return (
		<div>
			<PostView
				key={post.postId}
				post={post}
			/>
			<div className="comment-container">
				<div className="comment-field-name">댓글</div>
				<div className="comment-input-area">
					<input className='comment-input-box' placeholder='댓글 작성..' />
					<img className='comment-input-button' src='/feed/paper-airplane.svg' alt="댓글쓰기" />
				</div>
				<div className="comment-list-area">
					{comments.map((comment, index) => (
						<div key={index} className='comment-detail-area'>
							<img
								className='comment-detail-profile'
								src="/feed/profile_icon3.png"
								alt="프로필 이미지"
							/>
							<div className='comment-detail-data'>
								<div className='comment-detail-name'>{comment.memberName}</div>
								<div className='comment-detail-date'>{comment.commentDate}</div>
							</div>
							<div className='comment-detail-content'>{comment.commentContent}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Post;