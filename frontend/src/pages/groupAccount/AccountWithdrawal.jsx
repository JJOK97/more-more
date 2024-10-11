import React, { useState } from 'react';
import WithdrawalAccountInput from '@/components/groupAccount/WithdrawalAccountInput';
import TransferKeypad from '@/components/groupAccount/TransferKeypad';
import { useNavigate, useParams } from 'react-router-dom';

const AccountWithdrawal = () => {
	const [amount, setAmount] = useState('');
	const [accountNumber, setAccountNumber] = useState('');
	const navigate = useNavigate();
	const { groupId } = useParams();
	const [errorMessage, setErrorMessage] = useState('');

	const handleSendClick = async () => {
		if (!amount || parseInt(amount) === 0) {
			setErrorMessage('유효하지 않은 송금 금액입니다.');
			return;
		}

		if (!accountNumber) {
			setErrorMessage('계좌 번호를 입력해주세요.');
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
			<div className="transfer-keypad-container">
				{errorMessage && <div style={{ color: 'red', marginTop: '0.7rem' }}>{errorMessage}</div>}
				<TransferKeypad
					setAmount={setAmount}
					amount={amount}
					mode="withdrawal"
					accountNumber={accountNumber}
				/>
			</div>
		</div>
	);
};

export default AccountWithdrawal;
