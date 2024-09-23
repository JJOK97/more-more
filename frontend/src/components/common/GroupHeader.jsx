import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '@/assets/css/common/header.css';
import chevron from '@/assets/img/common/mainHeader/chevron-left.svg';
import user from '@/assets/img/common/mainHeader/user.svg';
import bell from '@/assets/img/common/mainHeader/bell.svg';
import useGroupName from '@/store/useGroupName';
import datas from '@/components/main/data.json';

const Header = () => {
	const groups = datas.groups;
	const { groupName } = useGroupName(); // groupName이 groupId를 가리킴
	const location = useLocation();
	const navigate = useNavigate(); // useNavigate 훅 사용

	// 그룹 ID에 해당하는 그룹의 이름을 찾기
	const currentGroup = groups.find((group) => group.groupId === parseInt(groupName));

	// 만약 그룹을 찾지 못하면 빈 문자열을 사용
	const displayedGroupName = currentGroup ? currentGroup.groupName : '';

	// '/' 경로에서는 Header가 보이지 않도록
	if (
		location.pathname === '/' ||
		location.pathname === '/login' ||
		location.pathname === '/signup' ||
		location.pathname === '/group/:groupId/account/transfer'
	)
		return null;

	return (
		<header className="common-header">
			<div className="menu">
				<div className="headLeft">
					<div className="groupName">
						{/* 뒤로가기 버튼 */}
						<img
							className="group-header-back-button-img"
							src={chevron}
							alt="Back"
							onClick={() => navigate(-1)} // 뒤로가기
						/>
						{/* 해당 그룹의 이름을 보여줌 */}
						<div>{displayedGroupName}</div>
					</div>
				</div>
				<div className="headerRight">
					<img
						src={user}
						alt="User"
					/>
					<img
						src={bell}
						alt="Notifications"
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
