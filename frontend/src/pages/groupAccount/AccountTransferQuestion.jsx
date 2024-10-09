import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import TransferInfo from '@/components/groupAccount/TransferInfo';

const AccountTransferQuestion = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { groupId } = useParams();

	const amount = location.state?.amount || '0';

	const handleSendClick = async () => {
		const memberId = localStorage.getItem('memberId');
		if (!memberId || !groupId) {
			alert('회원 정보 또는 모임 정보가 없습니다.');
			return;
		}

		if (parseInt(amount) === 0) {
			alert('송금 금액이 유효하지 않습니다.');
			return;
		}

		const requestData = {
			memberId: memberId,
			transactionBalance: amount.toString(),
			clubCode: groupId,
		};

		try {
			const response = await fetch(`https://j11a605.p.ssafy.io/api/account/fill`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestData),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const responseData = await response.json();
			console.log('송금 성공: ', responseData);

			navigate(`/group/${groupId}/account/transfer-check`, { state: { amount } });
		} catch (error) {
			console.error('송금 중 오류 발생: ', error.message);
			alert('송금 중 오류가 발생했습니다.');
		}
	};

	return (
		<div className="account-question-info-area">
			<div className="account-question-top-component">
				<div className="transfer-info-area">
					<TransferInfo />
				</div>
				<div className="account-question">
					<div className="account-question-message">
						{Number(amount).toLocaleString()}원을 <br /> 송금하시겠어요?
					</div>
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

export default AccountTransferQuestion;
