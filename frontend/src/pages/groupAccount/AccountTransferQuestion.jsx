import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TransferInfo from '@/components/groupAccount/TransferInfo';

const AccountTransferQuestion = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const amount = location.state?.amount || '0';

	const groupId = location.pathname.match(/^\/group\/(\d+)/)?.[1];

	const handleSendClick = () => {
		if (groupId) {
			navigate(`/group/${groupId}/account`);
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
