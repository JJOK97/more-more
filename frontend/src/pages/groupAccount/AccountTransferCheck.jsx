import React from 'react';
import TransferInfo from '@/components/groupAccount/TransferInfo';
import AccountCheckMessage from '@/components/groupAccount/AccountCheckMessage';
import { useLocation } from 'react-router-dom';

const AccountTransferCheck = () => {
	const location = useLocation();
	const amount = location.state?.amount || '0';

	return (
		<div className="account-check-info-area">
			<div className="account-check-top-component">
				<div className="transfer-info-area">
					<TransferInfo />
				</div>
				<div>
					<AccountCheckMessage />
					<div>보낼 금액: {Number(amount).toLocaleString()}원</div>
				</div>
			</div>
			<div className="account-check-button">
				<button className="send-button">보내기</button>
			</div>
		</div>
	);
};

export default AccountTransferCheck;
