import React, { useState } from 'react';
import account_search from '@/assets/img/account/account_search.svg';

const SearchBar = ({ selectedDate, onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const today = new Date();

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value); // 검색어 입력값만 설정하고 바로 검색하지 않음
	};

	const handleSearchClick = () => {
		console.log('Search term:', searchTerm); // 디버깅용 로그
		onSearch(searchTerm); // 이미지 클릭 시 부모 컴포넌트로 검색어 전달
	};

	return (
		<div>
			<div className="search-standard">
				<div>
					<span>{selectedDate ? selectedDate.toLocaleDateString() : today.toLocaleDateString()}</span>
				</div>
				<div className="search-box-with-img">
					<input
						type="text"
						value={searchTerm}
						onChange={handleInputChange}
						placeholder="사용처를 검색해보세요."
					/>
					<img
						src={account_search}
						alt="account_search"
						onClick={handleSearchClick} // 이미지 클릭 시 검색 실행
						style={{ cursor: 'pointer' }} // 클릭 가능한 이미지를 시각적으로 표시
					/>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
