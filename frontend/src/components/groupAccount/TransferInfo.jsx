import React from 'react';
import back from '@/assets/img/account/back.svg';

const TransferInfo = () => {
	return (
		<div className="transfer-info">
			<div className="transfer-back">
				<img src={back}></img>
			</div>
			<div className="transfer-account-info">
				<div className="transer-my-account">
					<div className="from-my-account">내 하나은행 입출금 계좌에서</div>
					<div className="transfer-balance">잔액 1,000,000원</div>
				</div>
				<div className="transfer-group-account">
					<div className="to-group-account">가족모임 계좌로</div>
					<div className="transfer-account">싸피 뱅크 3333-02-123456</div>
				</div>
			</div>
		</div>
	);
};

export default TransferInfo;
