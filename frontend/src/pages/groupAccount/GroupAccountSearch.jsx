import React, { useState, useEffect } from 'react';
import Calendar from '@/components/calendar/Calendar';
import SearchBar from '@/components/groupAccount/SearchBar';
import GroupAccountDepositList from '@/components/groupAccount/GroupAccountDepositList';
import useGroupName from '@/store/useGroupName';
import { useParams } from 'react-router-dom';
import { getDatas } from '../feed/getData';

const GroupAccountSearch = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출
	const [groupInfo, setGroupInfo] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = (term) => {
		setSearchTerm(term);
	};

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

	return (
		<div className="group-account-search-area">
			<div>
				<Calendar onSelectDate={setSelectedDate} />
			</div>
			<div className="search-deposit-list-area">
				<div>
					<SearchBar
						selectedDate={selectedDate}
						onSearch={handleSearch}
					/>
				</div>
				<div>
					<GroupAccountDepositList selectedDate={selectedDate} />
				</div>
			</div>
		</div>
	);
};

export default GroupAccountSearch;
