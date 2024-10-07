import React from 'react';
import '@/assets/css/groupAccount/GroupAccount.css';
import DepositStatusPayment from '@/components/groupAccount/DepositStatusPayment';
import DuesGroupMemberStatus from '@/components/groupAccount/DuesGroupMemberStatus';

const GroupAccountDepositStatus = () => {
	return (
		<div className="deposit-status">
			<div className="deposit-status-payment">
				<DepositStatusPayment />
			</div>
			<div className="dues-group-member-status-area">
				<DuesGroupMemberStatus />
			</div>
		</div>
	);
};

export default GroupAccountDepositStatus;
