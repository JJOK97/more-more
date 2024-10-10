import React, { useEffect, useState } from 'react';
import TransactionDetailOneList from '@/components/groupAccount/TransactionDetailOneList';
import useGroupName from '@/store/useGroupName';
import { useParams } from 'react-router-dom';
import { getDatas } from '../feed/getData';

const TransactionDetail = () => {
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

	return (
		<div className="detail-container">
			<TransactionDetailOneList groupId={groupId} />
		</div>
	);
};

export default TransactionDetail;
