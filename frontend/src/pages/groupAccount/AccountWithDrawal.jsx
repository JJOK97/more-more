import React, { useState } from 'react';
import WithdrawalAccountInput from '@/components/groupAccount/WithdrawalAccountInput';
import TransferKeypad from '@/components/groupAccount/TransferKeypad';
import { useNavigate, useParams } from 'react-router-dom';

const AccountWithdrawal = () => {
	const [amount, setAmount] = useState('');
	const [accountNumber, setAccountNumber] = useState('');
	const navigate = useNavigate();
	const { groupId } = useParams();

	const handleSendClick = async () => {
		if (!amount || parseInt(amount) === 0) {
			alert('송금 금액이 유효하지 않습니다.');
			return;
		}

		if (!accountNumber) {
			alert('계좌 번호를 입력해주세요.');
			return;
		}

		navigate(`/group/${groupId}/account/withdrawal-question`, { state: { amount, accountNumber } });
	};

	return (
		<div className="account-transfer-area">
			<WithdrawalAccountInput
				setAccountNumber={setAccountNumber}
				mode="withdrawal"
			/>
			<TransferKeypad
				setAmount={setAmount}
				amount={amount}
				mode="withdrawal"
				accountNumber={accountNumber}
			/>
		</div>
	);
};

export default AccountWithdrawal;
