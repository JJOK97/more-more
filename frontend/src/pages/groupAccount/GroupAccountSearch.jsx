import React, { useState, useEffect } from 'react';
import Calendar from '@/components/calendar/Calendar';
import SearchBar from '@/components/groupAccount/SearchBar';
import GroupAccountDepositList from '@/components/groupAccount/GroupAccountDepositList';
import useGroupName from '@/store/useGroupName';
import { useParams } from 'react-router-dom';

const GroupAccountSearch = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출
	const [selectedDate, setSelectedDate] = useState(null);

	useEffect(() => {
		setGroupName(groupId);
	}, []);

	return (
		<div className="group-account-search-area">
			<div>
				<Calendar onSelectDate={setSelectedDate} />
			</div>
			<div className="search-deposit-list-area">
				<div>
					<SearchBar selectedDate={selectedDate} />
				</div>
				<div>
					<GroupAccountDepositList selectedDate={selectedDate} />
				</div>
			</div>
		</div>
	);
};

export default GroupAccountSearch;
