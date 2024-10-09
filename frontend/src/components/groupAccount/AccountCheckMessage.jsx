import React from 'react';

const AccountCheckMessage = ({ amount }) => {
	return (
		<div className="account-check">
			<div className="account-check-message">
				{Number(amount).toLocaleString()}원을 <br /> 송금했습니다!
			</div>
		</div>
	);
};

export default AccountCheckMessage;
