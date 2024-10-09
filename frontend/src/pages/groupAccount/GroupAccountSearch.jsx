import React, { useState, useEffect } from 'react';
import Calendar from '@/components/calendar/Calendar';
import SearchBar from '@/components/groupAccount/SearchBar';
import GroupAccountDepositList from '@/components/groupAccount/GroupAccountDepositList';
import useGroupName from '@/store/useGroupName';
import { useParams } from 'react-router-dom';
import { getAccountHistoriesByMonth } from '@/api/accountAPI'; // API 호출 임포트
import moment from 'moment';

const GroupAccountSearch = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출
	const [selectedDate, setSelectedDate] = useState(new Date()); // 초기값을 오늘로 설정
	const [searchTerm, setSearchTerm] = useState('');
	const [scheduleDates, setScheduleDates] = useState([]); // 거래 내역이 있는 날짜를 저장

	// 검색어 설정 핸들러
	const handleSearch = (term) => {
		setSearchTerm(term);
	};

	// 월이 변경될 때마다 API 호출하여 해당 월의 거래 내역 가져오기
	const handleMonthChange = async (activeStartDate) => {
		const month = moment(activeStartDate).format('YYYYMM'); // 해당 월을 YYYYMM 형식으로 변환

		try {
			// API 호출하여 해당 월의 거래 내역 가져오기
			const response = await getAccountHistoriesByMonth(groupId, month);

			// 거래 내역에서 날짜 추출하여 마킹할 날짜 리스트 생성
			const datesWithTransactions = response.map((item) =>
				moment(item.accountDate, 'YYYYMMDD').format('YYYY-MM-DD'),
			);
			setScheduleDates(datesWithTransactions); // 거래 내역이 있는 날짜만 저장
		} catch (error) {
			console.error('Error fetching account histories by month:', error);
		}
	};

	useEffect(() => {
		setGroupName(groupId);
	}, [groupId, setGroupName]);

	return (
		<div className="group-account-search-area">
			<div>
				<Calendar
					onSelectDate={setSelectedDate}
					onMonthChange={handleMonthChange} // 월 변경 핸들러 추가
					scheduleDates={scheduleDates} // 마킹할 날짜 전달
				/>
			</div>
			<div className="search-deposit-list-area">
				<div>
					<SearchBar
						selectedDate={selectedDate}
						onSearch={handleSearch}
					/>
				</div>
				<div>
					<GroupAccountDepositList
						selectedDate={selectedDate} // 선택한 날짜를 전달
						searchTerm={searchTerm} // 검색어 전달
					/>
				</div>
			</div>
		</div>
	);
};

export default GroupAccountSearch;
