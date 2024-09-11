import React from 'react';
import '@/assets/css/feed/Feed.css';

const Feed = () => {
	const posts = [
		{
			postId: 1,
			userId: 1,
			userName: '옥진석',
			userProfile: '/feed/jinsukProfile.png',
			date: '2024.09.10',
			accountHistory: '2022.05.19 서브웨이 역삼점',
			postContent:
				'이런 눈빛을 한 지은이의 정면 얼굴을 마주할 때마다, 영영 익숙해지지 않을 것 같은 새로운 종류의 박자로 심장이 달음질 친다. 다람쥐 헌 쳇바퀴에 타고파.',
			postImage: 'feed/회식.webp',
		},
	];
	return (
		<div>
			<img
				className="group-background-image"
				src='/feed/배경사진.png'
				alt="배경사진"
			/>
			<div className='feed-container'>
				{posts.map((post) => (
					<div key={post.postId} className='feed-area'>
						<div className='feed-profile-area'>
							{/* 프로필 */}
							<img
								className="feed-profile-image"
								src={post.userProfile}
								alt="프로필"
							/>
							<div className='feed-profile-data'>
								<div className='feed-profile-name'>{post.userName}</div>
								<div className='feed-profile-date'>{post.date}</div>
							</div>
						</div>
						<div className='feed-post-area'>
							{/* 게시글 */}
							<div className='feed-post-content'>{post.postContent}</div>
							<img
								className="feed-post-image"
								src={post.postImage}
								alt="사진"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Feed;
