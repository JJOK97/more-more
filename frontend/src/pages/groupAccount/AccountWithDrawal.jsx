import React from 'react';
import WithDrawalInfo from '@/components/groupAccount/WithDrawalInfo';
import TransferKeypad from '@/components/groupAccount/TransferKeypad';

const AccountWithDrawal = () => {
	return (
		<div className="account-transfer-area">
			<WithDrawalInfo />
			<TransferKeypad />
		</div>
	);
};

export default AccountWithDrawal;
