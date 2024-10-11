import AccountBalance from '@/components/groupAccount/GroupAccountBalance';
import GroupAccountDepositWithdrawalDetails from '@/components/groupAccount/GroupAccountDepositWithdrawalDetails';
import '@/assets/css/groupAccount/GroupAccount.css';
import useGroupName from '@/store/useGroupName';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatas } from '../feed/getData';
import useGroupStore from '@/store/useGroupStore';

const GroupAccount = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출
	const [groupInfo, setGroupInfo] = useState(null);
	const { setClubCode, setCreatedDate, setDues } = useGroupStore();

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

	useEffect(() => {
		if (groupInfo && groupInfo.clubName) {
			setGroupName(groupInfo.clubName);
			setClubCode(groupInfo.clubCode); // clubCode 저장
			setCreatedDate(groupInfo.createdDate); // createdDate 저장
			setDues(groupInfo.dues); // dues 저장
		}
	}, [groupInfo, setGroupName, setClubCode, setCreatedDate, setDues]);

	return (
		<div className="account-area">
			<AccountBalance />
			<GroupAccountDepositWithdrawalDetails />
		</div>
	);
};

export default GroupAccount;
