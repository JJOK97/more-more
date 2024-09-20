import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import '@/assets/css/common/header.css';
import chevron from '@/assets/img/common/mainHeader/chevron-left.svg';
import user from '@/assets/img/common/mainHeader/user.svg';
import bell from '@/assets/img/common/mainHeader/bell.svg';
import groupData from '@/components/main/data.json'; // data.json 파일의 실제 경로로 수정해주세요

const Header = () => {
	const location = useLocation();
	if (location.pathname === '/') return null;
	return (
		<header className="common-header">
			<div className="menu">
				<div className="headLeft">
					<div className="groupName">
						<Link to="/groups">
							<img
								src={chevron}
								alt="Back"
							/>
						</Link>
						<div>groupName</div>
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
