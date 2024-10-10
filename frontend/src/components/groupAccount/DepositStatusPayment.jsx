import React, { useState, useEffect } from 'react';
import Rolldate from 'rolldate';
import '@/assets/css/groupAccount/GroupAccount.css';
import arrow from '@/assets/img/account/arrow_down.svg';
import { getAccountCompareDate } from '@/api/accountApi';
import { getMemberInfo } from '@/api/userAPI';
import useGroupStore from '@/store/useGroupStore';

const DepositStatusPayment = ({ dueDate, selectedDate, setSelectedDate }) => {
	const [memberName, setMemberName] = useState('');
	const [paymentStatus, setPaymentStatus] = useState('');
	const { clubCode, createdDate, dues } = useGroupStore();

	// 숫자 포맷팅 함수 (1000원 단위로 콤마 추가)
	const formatCurrency = (amount) => {
		return new Intl.NumberFormat('ko-KR').format(amount);
	};

	// 회원 정보 및 납부 상태 확인 함수
	const fetchMemberInfoAndCheckStatus = async (year, month) => {
		const memberId = localStorage.getItem('memberId');
		if (memberId && clubCode) {
			try {
				const data = await getMemberInfo(memberId);
				setMemberName(data.name);
				await checkPaymentStatus(clubCode, `${year}${month}`, data.name);
			} catch (error) {
				console.error('Error fetching member info:', error);
			}
		}
	};

	// 납부 상태 확인 함수
	const checkPaymentStatus = async (clubCode, date, name) => {
		try {
			const data = await getAccountCompareDate(clubCode, date);
			const isPaid = data.includes(name);
			setPaymentStatus(isPaid ? '납부' : '미납');
		} catch (error) {
			console.error('Error checking payment status:', error);
		}
	};

	// 선택된 날짜에 따라 데이터 갱신
	useEffect(() => {
		if (selectedDate.year && selectedDate.month) {
			fetchMemberInfoAndCheckStatus(selectedDate.year, selectedDate.month);
		}
	}, [clubCode, selectedDate]);

	// 날짜 선택 시 Rolldate 사용
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
				setSelectedDate({
					dateString: `${year}년 ${month}월`,
					year: year,
					month: month,
					yyyymm: `${year}${month}`,
				});
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
				{selectedDate.dateString}{' '}
				<img
					src={arrow}
					alt="arrow-down"
				/>
			</div>
			<div className="deposit-payment-status">
				<div className="dues-payment">
					🎉 {memberName}님은 {selectedDate.month}월 회비를 <span>{paymentStatus}</span>하셨어요! 🎉
				</div>
				<div className="dues-payment-info">
					<li>
						<span className="payment-date">
							매 월 {createdDate ? new Date(createdDate).getDate() : dueDate || '미정'}일
						</span>
						이 납입일이에요.
					</li>
					<li>
						이번 달에는{' '}
						<span className="payment-this-month">{dues ? `${formatCurrency(dues)}원` : '100,000원'}</span>을{' '}
						{paymentStatus} 하셨어요.
					</li>
				</div>
			</div>
		</div>
	);
};

export default DepositStatusPayment;
