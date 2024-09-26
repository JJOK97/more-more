import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '@/assets/css/feed/Feed.css';
import PostView from '@/components/postView/PostView';
import datas from '@/pages/feed/data.json';
import useGroupName from '@/store/useGroupName';

const Feed = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		setGroupName(groupId);
	}, []);

	useEffect(() => {
		const fetchPosts = () => {
			// groupId에 해당하는 게시물만 필터링
			const filteredPosts = datas.posts.filter((post) => post.groupId === parseInt(groupId, 10));
			setPosts(filteredPosts);
		};

		fetchPosts();
	}, [groupId]); // groupId가 변경될 때마다 실행

	if (!posts) {
		return <div>Loading...</div>;
	}

	return (
		<div className="group-feed">
			<img
				className="group-background-image"
				src="/feed/회식.webp"
				alt="배경사진"
			/>
			<div className="feed-container">
				{posts.length > 0 ? (
					posts
						.slice() // 원본 배열을 유지하기 위해 복사
						.reverse() // 복사한 배열을 역순으로
						.map((post) => (
							<PostView
								key={post.postId}
								post={post}
							/>
						))
				) : (
					<p>모임에 아직 게시물이 없습니다.</p>
				)}
			</div>
			<Link to={`/group/${groupId}/create`}>
				<img
					className="feed-write-btn"
					src="/feed/edit.svg"
					alt="글쓰기"
				/>
			</Link>
		</div>
	);
};

export default Feed;
