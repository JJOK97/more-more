import React from 'react';
import '@/assets/css/groupAccount/GroupAccount.css';
import DepositStatusPayment from '@/components/groupAccount/DepositStatusPayment';
import DuesGroupMemberStatus from '@/components/groupAccount/DuesGroupMemberStatus';

const GroupAccountDepositStatus = () => {
	return (
		<div>
			<div className="deposit-status-payment">
				<DepositStatusPayment />
			</div>
			<div className="DuesGroupMemberStatus">
				<DuesGroupMemberStatus />
			</div>
		</div>
	);
};

export default GroupAccountDepositStatus;
