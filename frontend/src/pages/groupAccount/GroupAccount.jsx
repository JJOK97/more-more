import AccountBalance from '@/components/groupAccount/GroupAccountBalance';
import GroupAccountDepositWithdrawalDetails from '@/components/groupAccount/GroupAccountDepositWithdrawalDetails';
import '@/assets/css/groupAccount/GroupAccount.css';
import useGroupName from '@/store/useGroupName';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatas } from '../feed/getData';

const GroupAccount = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출
	const [groupInfo, setGroupInfo] = useState(null);

	// 그룹 정보를 불러오는 useEffect
	useEffect(() => {
		const getGroupInfo = async () => {
			try {
				const url = `https://j11a605.p.ssafy.io/api/club/${groupId}`;
				const data = await getDatas(url);
				setGroupInfo(data);
			} catch (error) {
				console.error('Error fetching group info:', error);
			}
		};
		getGroupInfo();
	}, [groupId]);

	// groupInfo가 업데이트될 때, groupName 상태를 업데이트
	useEffect(() => {
		if (groupInfo && groupInfo.clubName) {
			setGroupName(groupInfo.clubName);
		}
	}, [groupInfo, setGroupName]);

	return (
		<div className="account-area">
			<AccountBalance />
			<GroupAccountDepositWithdrawalDetails />
		</div>
	);
};

export default GroupAccount;
