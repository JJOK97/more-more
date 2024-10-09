import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // useParams 추가
import './SearchPost.css';
import PostView from '@/components/postView/PostView'; // PostView 컴포넌트 가져오기
import useGroupName from '@/store/useGroupName';
import { getDatas } from '../feed/getData';

const SearchPost = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // groupId 가져오기
	const [groupInfo, setGroupInfo] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState([]);

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
	// };
	const handleSearch = async () => {
		try {
			const url = `https://j11a605.p.ssafy.io/api/posting/${groupId}/search?keyword=${searchTerm}`;
			const data = await getDatas(url);
			setResults(data);
			console.log(data);
		} catch (error) {
			console.log('Error fetching search result', error);
		}
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

			{results.length > 0 ? (
				<div className="search-results">
					{results.map((post) => (
						<PostView
							key={post.postId}
							post={post}
						/> // PostView 컴포넌트로 표시
					))}
				</div>
			) : (
				<div>검색결과가 없습니다.</div>
			)}
		</div>
	);
};

export default SearchPost;
