import React from 'react';
import TransferInfo from '../../components/groupAccount/TransferInfo';
import TransferKeypad from '../../components/groupAccount/TransferKeypad';

const AccountTransfer = () => {
	return (
		<div className="account-transfer-area">
			<TransferInfo />
			<TransferKeypad />
		</div>
	);
};

export default AccountTransfer;
