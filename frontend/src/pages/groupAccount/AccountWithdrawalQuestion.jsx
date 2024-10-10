import React, { useState } from 'react';
import WithdrawalInfo from '@/components/groupAccount/WithdrawalInfo';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AccountWithdrawalQuesion = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { groupId } = useParams();

	const amount = location.state?.amount || '0';
	const accountNumber = location.state?.accountNumber || '계좌번호 없음';
	const [errorMessage, setErrorMessage] = useState('');

	const handleSendClick = async () => {
		if (!groupId) {
			setErrorMessage('모임 정보가 없습니다.');
			return;
		}

		if (parseInt(amount) === 0 || accountNumber === '계좌번호 없음') {
			setErrorMessage('송금 금액 또는 계좌번호가 유효하지 않습니다.');
			return;
		}

		const requestData = {
			ssafyAccountNumber: String(accountNumber),
			transactionBalance: String(amount),
			clubCode: String(groupId),
		};

		try {
			const response = await fetch(`https://j11a605.p.ssafy.io/api/account/transfer`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestData),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			navigate(`/group/${groupId}/account/withdrawal-check`, {
				state: { amount, accountNumber },
			});
		} catch (error) {
			console.error('송금 중 오류 발생: ', error.message);
			setErrorMessage('송금 중 오류가 발생했습니다.');
		}
	};

	return (
		<div className="account-question-info-area">
			<div className="account-question-top-component">
				<div className="transfer-info-area">
					<WithdrawalInfo
						accountNumber={accountNumber}
						mode="withdrawal"
					/>
				</div>
				<div className="account-question">
					<div className="account-question-message">
						{Number(amount).toLocaleString()}원을 송금하시겠어요?
					</div>
					{errorMessage && <div style={{ color: 'red', marginTop: '0.7rem' }}>{errorMessage}</div>}
				</div>
			</div>
			<div className="account-question-button">
				<button
					className="send-button"
					onClick={handleSendClick}
				>
					보내기
				</button>
			</div>
		</div>
	);
};

export default AccountWithdrawalQuesion;
