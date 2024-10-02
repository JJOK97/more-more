import React, { useEffect } from 'react';
import '@/assets/css/groupAccount/GroupAccount.css';
import DepositStatusPayment from '@/components/groupAccount/DepositStatusPayment';
import DuesGroupMemberStatus from '@/components/groupAccount/DuesGroupMemberStatus';
import useGroupName from '@/store/useGroupName';
import { useParams } from 'react-router-dom';

const GroupAccountDepositStatus = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출

	useEffect(() => {
		setGroupName(groupId);
	}, []);

	return (
		<div className="deposit-status">
			<div className="deposit-status-payment">
				<DepositStatusPayment />
			</div>
			<div className="dues-group-member-status-area">
				<DuesGroupMemberStatus />
			</div>
		</div>
	);
};

export default GroupAccountDepositStatus;
