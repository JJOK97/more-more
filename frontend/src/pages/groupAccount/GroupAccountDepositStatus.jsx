import React, { useEffect, useState } from 'react';
import '@/assets/css/groupAccount/GroupAccount.css';
import DepositStatusPayment from '@/components/groupAccount/DepositStatusPayment';
import DuesGroupMemberStatus from '@/components/groupAccount/DuesGroupMemberStatus';
import useGroupName from '@/store/useGroupName';
import { useParams } from 'react-router-dom';

const GroupAccountDepositStatus = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출
	const [selectedDate, setSelectedDate] = useState({
		dateString: '', // '2024년 10월' 형식
		year: '', // '2024'
		month: '', // '10'
		yyyymm: '', // '202410'
	});

	useEffect(() => {
		setGroupName(groupId);

		// 현재 날짜로 초기화
		const currDate = new Date();
		const currYear = currDate.getFullYear().toString();
		const currMonth = (currDate.getMonth() + 1).toString().padStart(2, '0');
		setSelectedDate({
			dateString: `${currYear}년 ${currMonth}월`,
			year: currYear,
			month: currMonth,
			yyyymm: `${currYear}${currMonth}`,
		});
	}, []);

	return (
		<div className="deposit-status">
			<div className="deposit-status-payment">
				<DepositStatusPayment
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
				/>
			</div>
			<div className="dues-group-member-status-area">
				<DuesGroupMemberStatus selectedDate={selectedDate} />
			</div>
		</div>
	);
};

export default GroupAccountDepositStatus;
