import React from 'react';
import account_search from '@/assets/img/account/account_search.svg';
import DepositListDate from '@/components/groupAccount/DepositListDate';

const SearchBar = () => {
	return (
		<div>
			<div className="search-standard">
				<div>
					<DepositListDate />
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
