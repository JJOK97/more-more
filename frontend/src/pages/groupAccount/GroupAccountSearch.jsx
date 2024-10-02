import React, { useEffect } from 'react';
import Calendar from '@/components/calendar/Calendar';
import SearchBar from '@/components/groupAccount/SearchBar';
import GroupAccountDepositList from '@/components/groupAccount/GroupAccountDepositList';
import useGroupName from '@/store/useGroupName';
import { useParams } from 'react-router-dom';

const GroupAccountSearch = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출

	useEffect(() => {
		setGroupName(groupId);
	}, []);

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
