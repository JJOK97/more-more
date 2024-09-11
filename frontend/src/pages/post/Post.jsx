import React from 'react';
import { useParams } from 'react-router-dom';
import PostView from '@/components/postView/PostView';
import datas from '@/pages/feed/data.json';
import '@/assets/css/post/Post.css';

const Post = () => {
	const { id } = useParams();
	const post = datas.posts[id - 1];
	const comments = post.comments;
	console.log(comments);

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
					<img alt="댓글쓰기" />
				</div>
				<div className="comment-list-area">
					{comments.map((comment) => (
						<div className='comment-detail-area'>
							<img
                                className='comment-detail-profile'
								src=""
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
