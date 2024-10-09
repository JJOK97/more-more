import React, { useState } from 'react';
import TransferInfo from '@/components/groupAccount/TransferInfo';
import TransferKeypad from '@/components/groupAccount/TransferKeypad';

const AccountTransfer = () => {
	const [amount, setAmount] = useState('');

	return (
		<div className="account-transfer-area">
			<TransferInfo mode="transfer" />
			<TransferKeypad
				setAmount={setAmount}
				amount={amount}
				mode="transfer"
			/>
		</div>
	);
};

export default AccountTransfer;
