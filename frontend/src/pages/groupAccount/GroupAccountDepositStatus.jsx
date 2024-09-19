import React from 'react';
import '@/assets/css/groupAccount/GroupAccount.css';
import DepositStatusPayment from '@/components/groupAccount/DepositStatusPayment';

const GroupAccountDepositStatus = () => {
	return (
		<div className="deposit-status-payment">
			<DepositStatusPayment />
		</div>
	);
};

export default GroupAccountDepositStatus;
