import React, { useState } from 'react';
import Rolldate from 'rolldate';
import '@/assets/css/groupAccount/GroupAccount.css';
import arrow from '@/assets/img/account/arrow_down.svg';

const DepositStatusPayment = ({ dueDate }) => {
	const currDate = new Date();
	const currYear = currDate.getFullYear();
	const currMonth = (currDate.getMonth() + 1).toString().padStart(2, '0');

	const [selectedDate, setSelectedDate] = useState('2024년 9월');

	const handleDateClick = () => {
		const rolldate = new Rolldate({
			format: 'YYYY-MM',
			beginYear: 2000,
			endYear: 2100,
			lang: {
				title: '<div class="rolldate-title"> 년도 및 월 선택 </div>',
				cancel: '취소',
				confirm: '확인',
				year: '년',
				month: '월',
			},
			confirm: (date) => {
				const [year, month] = date.split('-');
				setSelectedDate(`${year}년 ${month}월`);
			},
		});
		rolldate.show();
	};
	return (
		<div className="deposit-payment-area">
			<div
				className="filter-date"
				onClick={handleDateClick}
			>
				{selectedDate}{' '}
				<img
					src={arrow}
					alt="arrow-down"
				/>
			</div>
			<div className="deposit-payment-status">
				<div className="dues-payment">
					🎉 박지환님은 9월 회비를 <span>납부</span>하셨어요! 🎉
				</div>
				<div className="dues-payment-info">
					<li>
						<span className="payment-date">매월 1일</span>이 납입일이에요.
					</li>
					<li>
						이번 달에는 <span className="payment-this-month">100,000원</span>을 납부하셨어요.
					</li>
				</div>
			</div>
		</div>
	);
};

export default DepositStatusPayment;
