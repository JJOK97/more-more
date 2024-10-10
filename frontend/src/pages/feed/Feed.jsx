import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '@/assets/css/feed/Feed.css';
import PostView from '@/components/postView/PostView';
import useGroupName from '@/store/useGroupName';
import { getDatas } from './getData';

const Feed = () => {
	const { groupId } = useParams(); // URL에서 groupId를 추출
	const [groupInfo, setGroupInfo] = useState(null);
	const { setGroupName } = useGroupName();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

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

	// 게시물들을 불러오는 useEffect
	useEffect(() => {
		const getAllPosts = async () => {
			setLoading(true); // 로딩 시작
			try {
				const url = `https://j11a605.p.ssafy.io/api/posting/${groupId}/allPostings`;
				const data = await getDatas(url);
				setPosts(data);
				console.log(data);
			} catch (error) {
				console.error('Error fetching posts:', error);
			} finally {
				setLoading(false);
			}
		};
		getAllPosts();
	}, [groupId]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="group-feed">
			<img
				className="group-background-image"
				src={groupInfo && groupInfo.clubImage}
				alt="배경사진"
			/>
			<div className="feed-container">
				{posts.length > 0 ? (
					posts.map((post) => (
						<PostView
							key={post.postingId}
							post={post}
							commentCount={post.commentCount != 0 ? post.commentCount : 0}
						/>
					))
				) : (
					<p>게시물이 없습니다</p>
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
