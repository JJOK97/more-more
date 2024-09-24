import React from 'react';
import DepositListDate from '@/components/groupAccount/DepositListDate';
import bill from '@/assets/img/account/bill_img.svg';
import MoveToPost from '@/components/groupAccount/MoveToPost';

const TransactionDetailOneList = () => {
	return (
		<div className="transaction-detail">
			<div className="transaction-detail-one-list">
				<div className="transaction-detail-date">
					<DepositListDate />
				</div>
				<div className="deposit-list-place-price">
					<div className="deposit-list-place">지에스25 디엑스랩점</div>
					<div className="deposit-list-price">-2,800원</div>
				</div>
				<div className="deposit-list-time-balance">
					<div className="deposit-list-time">18:39</div>
					<div className="deposit-list-balance">3,410,000원</div>
				</div>
			</div>
			<div className="bill-area">
				<img src={bill} />
				<div>
					<div className="memo-title">메모</div>
					<div className="memo-content">김부장 외 6인 회식</div>
				</div>
			</div>
			<MoveToPost />
		</div>
	);
};

export default TransactionDetailOneList;
