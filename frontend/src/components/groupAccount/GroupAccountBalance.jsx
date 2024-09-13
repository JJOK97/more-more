import React from 'react';
import arrow from '@/assets/img/account/arrow_right.svg';

const AccountBalance = () => {
	return (
		<div className="account-balance">
			<div className="dues">
				<text name="dues">매 월 1일, 10만원씩 | 입금현황</text>
				<img
					src={arrow}
					alt="move_to_deposit_list"
				/>
			</div>
			<div className="account-balance-info">
				<text name="account-number">3333-02-123456</text>
				<text name="account-balance">3,410,000 원</text>
			</div>
			<div className="account-balance-button">
				<button name="fill">채우기</button>
				<button name="send">보내기</button>
			</div>
		</div>
	);
};

export default AccountBalance;
