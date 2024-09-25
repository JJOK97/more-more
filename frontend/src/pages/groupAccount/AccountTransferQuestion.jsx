import React from 'react';
import TransferInfo from '@/components/groupAccount/TransferInfo';
import AccountQuestionMessage from '@/components/groupAccount/AccountQuestionMessage';
import AccountSendButton from '@/components/groupAccount/AccountSendButton';

const AccountTransferQuestion = () => {
	return (
		<div className="account-question-info-area">
			<div className="account-question-top-component">
				<div className="transfer-info-area">
					<TransferInfo />
				</div>
				<div>
					<AccountQuestionMessage />
				</div>
			</div>
			<div className="account-question-button">
				<AccountSendButton />
			</div>
		</div>
	);
};

export default AccountTransferQuestion;
