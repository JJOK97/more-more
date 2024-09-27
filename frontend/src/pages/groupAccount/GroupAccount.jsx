import AccountBalance from '@/components/groupAccount/GroupAccountBalance';
import GroupAccountDepositWithdrawalDetails from '@/components/groupAccount/GroupAccountDepositWithdrawalDetails';
import '@/assets/css/groupAccount/GroupAccount.css';

const GroupAccount = () => {
	return (
		<div className="account-area">
			<AccountBalance />
			<GroupAccountDepositWithdrawalDetails />
		</div>
	);
};

export default GroupAccount;
