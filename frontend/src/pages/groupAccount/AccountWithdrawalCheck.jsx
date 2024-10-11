import React from 'react';
import WithdrawalInfo from '@/components/groupAccount/WithdrawalInfo';
import AccountCheckMessage from '@/components/groupAccount/AccountCheckMessage';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const AccountWithdrawalCheck = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { groupId } = useParams();

	const amount = location.state?.amount || '0';

	const handleSendClick = async () => {
		try {
			navigate(`/group/${groupId}/account`);
		} catch (error) {
			console.error('송금 중 오류 발생: ', error.message);
		}
	};

	return (
		<div className="account-check-info-area">
			<div className="account-check-top-component">
				<div className="transfer-info-area">
					<WithdrawalInfo />
				</div>
				<div>
					<AccountCheckMessage amount={amount} />
				</div>
			</div>
			<div className="account-check-button">
				<button
					className="send-button"
					onClick={handleSendClick}
				>
					확인
				</button>
			</div>
		</div>
	);
};

export default AccountWithdrawalCheck;
