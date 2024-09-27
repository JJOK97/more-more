import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // useParams 추가
import './SearchPost.css';
import datas from '../feed/data.json'; // 데이터 가져오기
import PostView from '@/components/postView/PostView'; // PostView 컴포넌트 가져오기

const SearchPost = () => {
	const { groupId } = useParams(); // groupId 가져오기
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState([]);

	const handleSearch = () => {
		if (!searchTerm) return;

		// 검색어에 맞는 게시물 필터링 (groupId에 맞는 게시물만)
		const filteredResults = datas.posts.filter(
			(post) =>
				post.groupId === parseInt(groupId, 10) && // groupId로 필터링
				(post.postContent.includes(searchTerm) ||
					post.userName.includes(searchTerm) ||
					post.accountHistory.includes(searchTerm)),
		);

		setResults(filteredResults); // 필터링된 결과 설정
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			// 엔터 키가 눌렸을 때
			handleSearch(); // 검색 함수 호출
		}
	};

	return (
		<div className="search-post-container">
			<div className="search-post-header">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러 추가
					placeholder="검색어를 입력하세요..."
					className="search-input"
				/>
				<button
					onClick={handleSearch}
					className="search-button"
				>
					검색
				</button>
			</div>

			{results.length > 0 && (
				<div className="search-results">
					{results.map((post) => (
						<PostView
							key={post.postId}
							post={post}
						/> // PostView 컴포넌트로 표시
					))}
				</div>
			)}
		</div>
	);
};

export default SearchPost;
