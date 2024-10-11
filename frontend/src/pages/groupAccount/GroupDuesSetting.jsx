import React, { useEffect } from 'react';
import GroupDuesPayment from '../../components/groupAccount/GroupDuesPayment';
import useGroupName from '@/store/useGroupName';
import { useParams } from 'react-router-dom';

const GroupDuesSetting = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출

	useEffect(() => {
		setGroupName(groupId);
	}, []);

	return (
		<div className="group-dues-payment">
			<GroupDuesPayment />
		</div>
	);
};

export default GroupDuesSetting;
