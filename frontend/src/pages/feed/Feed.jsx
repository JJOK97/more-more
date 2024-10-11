import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '@/assets/css/feed/Feed.css';
import PostView from '@/components/postView/PostView';
import useGroupName from '@/store/useGroupName';
import { getDatas } from './getData';

const Feed = () => {
	const { groupId } = useParams();
	const [groupInfo, setGroupInfo] = useState(null);
	const { setGroupName } = useGroupName();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

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

	useEffect(() => {
		if (groupInfo && groupInfo.clubName) {
			setGroupName(groupInfo.clubName);
		}
	}, [groupInfo, setGroupName]);

	useEffect(() => {
		const getAllPosts = async () => {
			try {
				const url = `https://j11a605.p.ssafy.io/api/posting/${groupId}/allPostings`;
				const data = await getDatas(url);
				setPosts(data);
			} catch (error) {
				console.error('Error fetching posts:', error);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 500); // 1초 후에 로딩 해제
			}
		};
		getAllPosts();
	}, [groupId]);

	return (
		<>
			{/* 로딩 컴포넌트는 항상 렌더링하고, loading 상태에 따라 클래스명을 변경합니다 */}
			<div className={`loading ${!loading ? 'loaded' : ''}`}>
				<span></span>
				<span></span>
				<span></span>
			</div>

			{/* 피드 컴포넌트도 항상 렌더링하고, loading 상태에 따라 클래스명을 변경합니다 */}
			<div className={`group-feed ${!loading ? 'loaded' : ''}`}>
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
								commentCount={post.commentCount !== 0 ? post.commentCount : 0}
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
		</>
	);
};

export default Feed;
