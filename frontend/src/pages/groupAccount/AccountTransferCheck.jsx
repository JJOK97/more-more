import React from 'react';
import TransferInfo from '@/components/groupAccount/TransferInfo';
import AccountCheckMessage from '@/components/groupAccount/AccountCheckMessage';

const AccountTransferCheck = () => {
	return (
		<div className="account-check-info-area">
			<div className="account-check-top-component">
				<div className="transfer-info-area">
					<TransferInfo />
				</div>
				<div>
					<AccountCheckMessage />
				</div>
			</div>
			<div className="account-check-button">
				<button className="send-button">보내기</button>
			</div>
		</div>
	);
};

export default AccountTransferCheck;
