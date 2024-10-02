import React, { useEffect } from 'react';
import TransactionDetailOneList from '@/components/groupAccount/TransactionDetailOneList';
import useGroupName from '@/store/useGroupName';
import { useParams } from 'react-router-dom';

const TransactionDetail = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출

	useEffect(() => {
		setGroupName(groupId);
	}, []);

	return (
		<div className="detail-container">
			<TransactionDetailOneList />
		</div>
	);
};

export default TransactionDetail;
