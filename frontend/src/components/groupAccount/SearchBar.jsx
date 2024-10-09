import React, { useState } from 'react';
import account_search from '@/assets/img/account/account_search.svg';

const SearchBar = ({ selectedDate, onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const today = new Date();

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
		onSearch(e.target.value); // 부모 컴포넌트에 검색어 전달
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
					/>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
