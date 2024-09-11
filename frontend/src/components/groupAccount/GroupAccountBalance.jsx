import React from 'react';

const AccountBalance = () => {
	return (
		<div className="AccountBalance">
			<div className="dues">
				<text name="dues">매 월 1일, 10만원씩 | 입금현황</text>
				<a href=""> > </a>
			</div>
			<div className="AccountBalance-info">
				<text name="account-number">3333-02-123456</text>
				<text name="account-balance">3,410,000 원</text>
			</div>
			<div className="AccountBalance-Button">
				<button name="fill">채우기</button>
				<button name="send">보내기</button>
			</div>
		</div>
	);
};

export default AccountBalance;
