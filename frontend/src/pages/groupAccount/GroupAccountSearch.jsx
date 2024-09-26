import React from 'react';
import Calendar from '@/components/calendar/Calendar';
import SearchBar from '@/components/groupAccount/SearchBar';
import GroupAccountDepositList from '@/components/groupAccount/GroupAccountDepositList';

const GroupAccountSearch = () => {
	return (
		<div className="group-account-search-area">
			<div>
				<Calendar />
			</div>
			<div className="search-deposit-list-area">
				<div>
					<SearchBar />
				</div>
				<div>
					<GroupAccountDepositList />
				</div>
			</div>
		</div>
	);
};

export default GroupAccountSearch;
