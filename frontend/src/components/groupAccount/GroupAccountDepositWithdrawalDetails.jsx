import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GroupAccountDepositList from '@/components/groupAccount/GroupAccountDepositList';
import account_search from '@/assets/img/account/account_search.svg';

const GroupAccountDepositWithDrawalDetails = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// URL에서 groupId 추출
	const groupId = location.pathname.match(/^\/group\/(\d+)/)?.[1];

	// 이미지 클릭 시 실행되는 함수
	const handleSearchClick = () => {
		if (groupId) {
			navigate(`/group/${groupId}/account/search`);
		}
	};

	return (
		<div className="deposit-list">
			<div className="searchStandard">
				<div className="deposit-list-filter">전체</div>
				<img
					src={account_search}
					alt="account_search"
					onClick={handleSearchClick} // 이미지 클릭 시 경로 이동
					style={{ cursor: 'pointer' }} // 클릭 가능한 이미지로 보이도록
				/>
			</div>
			<GroupAccountDepositList />
		</div>
	);
};

export default GroupAccountDepositWithDrawalDetails;
