import React from 'react';
import '@/assets/css/feed/Feed.css';
import PostView from '@/components/postView/PostView';
import datas from "@/pages/feed/data.json"

const Feed = () => {
	const posts = datas.posts;
	// const posts = [
	// 	{
	// 		postId: 1,
	// 		userId: 1,
	// 		userName: '옥진석',
	// 		userProfile: '/feed/profile_icon2.png',
	// 		date: '2024.09.10',
	// 		accountHistory: '2022.05.19 서브웨이 역삼점',
	// 		postContent:
	// 			'이런 눈빛을 한 지은이의 정면 얼굴을 마주할 때마다, 영영 익숙해지지 않을 것 같은 새로운 종류의 박자로 심장이 달음질 친다. 다람쥐 헌 쳇바퀴에 타고파.',
	// 		postImage: 'feed/회식.webp',
	// 		likeCount: 1,
	// 		commentCount: 1,
	// 	},
    //     {
	// 		postId: 2,
	// 		userId: 2,
	// 		userName: '박지환',
	// 		userProfile: '/feed/profile_icon3.png',
	// 		date: '2024.09.10',
	// 		accountHistory: '2022.05.19 서브웨이 역삼점',
	// 		postContent:
	// 			'이런 눈빛을 한 지은이의 정면 얼굴을 마주할 때마다, 영영 익숙해지지 않을 것 같은 새로운 종류의 박자로 심장이 달음질 친다. 다람쥐 헌 쳇바퀴에 타고파.',
	// 		postImage: 'feed/회식.webp',
	// 		likeCount: 1,
	// 		commentCount: 1,
	// 	},
	// 	{
	// 		postId: 3,
	// 		userId: 3,
	// 		userName: '옥진석',
	// 		userProfile: '/feed/profile_icon2.png',
	// 		date: '2024.09.10',
	// 		accountHistory: '2022.05.19 서브웨이 역삼점',
	// 		postContent:
	// 			'이런 눈빛을 한 지은이의 정면 얼굴을 마주할 때마다, 영영 익숙해지지 않을 것 같은 새로운 종류의 박자로 심장이 달음질 친다. 다람쥐 헌 쳇바퀴에 타고파.',
	// 		postImage: 'feed/회식.webp',
	// 		likeCount: 1,
	// 		commentCount: 1,
	// 	},
	// ];
	return (
		<div className='group-feed'>
			<img
				className="group-background-image"
				src="/feed/배경사진.png"
				alt="배경사진"
			/>
			<div className="feed-container">
				{posts ? posts.map((post) => (
					<PostView key={post.postId} post={post} />
				)) : ''}
			</div>
		</div>
	);
};

export default Feed;
