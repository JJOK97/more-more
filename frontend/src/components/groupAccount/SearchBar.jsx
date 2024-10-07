import React from 'react';
import account_search from '@/assets/img/account/account_search.svg';
import DepositListDate from '@/components/groupAccount/DepositListDate';

const SearchBar = ({ selectedDate }) => {
	return (
		<div>
			<div className="search-standard">
				<div>
					{selectedDate ? <span>{selectedDate.toLocaleDateString()}</span> : <span>날짜를 선택해주세요</span>}
					{/* <DepositListDate /> */}
				</div>
				<div className="search-box-with-img">
					<input type="text" />
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
