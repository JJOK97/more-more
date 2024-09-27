// 여기에 import 시켜서 화면 렌더링 시키기
// 컴포넌트들이 다 합쳐지는 페이지
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
