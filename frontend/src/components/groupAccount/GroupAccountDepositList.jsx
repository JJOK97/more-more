import React, { useEffect, useState } from 'react';
import DepositDetailOne from '@/components/groupAccount/DepositDetailOne';
import data from '@/components/groupAccount/data.depositdetail.json';
import '@/assets/css/groupAccount/GroupAccount.css';

const GroupAccountDepositList = () => {
	const [depositList, setDepositList] = useState([]);

	useEffect(() => {
		setDepositList(data); // 데이터를 상태로 설정
	}, []);

	return (
		<div className="group-account-deposit-list-area">
			{depositList.slice().reverse().map((item, index) => (
				<DepositDetailOne
					key={index}
					id={item.id}
					place={item.place}
					price={item.price}
					date={item.date}
					time={item.time}
					balance={item.balance}
				/>
			))}
		</div>
	);
};

export default GroupAccountDepositList;
