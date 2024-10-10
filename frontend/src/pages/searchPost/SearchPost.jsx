import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom'; // useLocation, useNavigate 추가
import './SearchPost.css';
import PostView from '@/components/postView/PostView';
import useGroupName from '@/store/useGroupName';
import { getDatas } from '../feed/getData';

const SearchPost = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [groupInfo, setGroupInfo] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState([]);

	// 쿼리 스트링에서 검색어 추출
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const keyword = params.get('keyword');
		if (keyword) {
			setSearchTerm(keyword);
			handleSearch(keyword);
		}
	}, [location.search]);

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

	const handleSearch = async (keyword) => {
		try {
			const url = `https://j11a605.p.ssafy.io/api/posting/${groupId}/search?keyword=${keyword}`;
			const data = await getDatas(url);
			setResults(data);
		} catch (error) {
			console.error('Error fetching search result', error);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			// 검색어를 URL 쿼리 스트링에 추가하여 페이지 이동
			navigate(`/group/${groupId}/search?keyword=${searchTerm}`);
		}
	};

	const handleButtonClick = () => {
		// 검색어를 URL 쿼리 스트링에 추가하여 페이지 이동
		navigate(`/group/${groupId}/search?keyword=${searchTerm}`);
	};

	return (
		<div className="search-post-container">
			<div className="search-post-header">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="검색어를 입력하세요..."
					className="search-input"
				/>
				<button
					onClick={handleButtonClick}
					className="search-button"
				>
					검색
				</button>
			</div>

			{results.length > 0 ? (
				<div className="search-results">
					{results.map((post) => (
						<PostView
							key={post.postingId}
							post={post}
						/>
					))}
				</div>
			) : (
				<div>검색결과가 없습니다.</div>
			)}
		</div>
	);
};

export default SearchPost;
