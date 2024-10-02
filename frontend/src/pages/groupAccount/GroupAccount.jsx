import AccountBalance from '@/components/groupAccount/GroupAccountBalance';
import GroupAccountDepositWithdrawalDetails from '@/components/groupAccount/GroupAccountDepositWithdrawalDetails';
import '@/assets/css/groupAccount/GroupAccount.css';
import useGroupName from '@/store/useGroupName';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GroupAccount = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출

	useEffect(() => {
		setGroupName(groupId);
	}, []);

	return (
		<div className="account-area">
			<AccountBalance />
			<GroupAccountDepositWithdrawalDetails />
		</div>
	);
};

export default GroupAccount;
