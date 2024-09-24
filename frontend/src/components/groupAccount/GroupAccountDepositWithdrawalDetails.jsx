import React from 'react';
import GroupAccountDepositList from '@/components/groupAccount/GroupAccountDepositList';
import account_search from '@/assets/img/account/account_search.svg';

const GroupAccountDepositWithDrawalDetails = () => {
	return (
		<div className="deposit-list">
			<div className="searchStandard">
				<div className="deposit-list-filter">전체</div>
				<img
					src={account_search}
					alt="account_search"
				/>
			</div>
			<GroupAccountDepositList />
		</div>
	);
};

export default GroupAccountDepositWithDrawalDetails;
