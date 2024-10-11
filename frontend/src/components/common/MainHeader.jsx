import React from 'react';
import '@/assets/css/common/header.css';
import logo from '@/assets/img/common/text-logo.svg';
import user from '@/assets/img/common/mainHeader/user.svg';
import bell from '@/assets/img/common/mainHeader/bell.svg';
import { Link, useLocation } from 'react-router-dom';
import useNoticeState from '@/store/useNoticeState'; // zustand store 가져오기

const Header = () => {
	const location = useLocation();
	const { isUnreadNotice } = useNoticeState(); // 읽지 않은 알림 상태 확인

	if (location.pathname !== '/' || location.pathname === '/login' || location.pathname === '/signup') return null;

	return (
		<header className="common-header">
			<div className="menu">
				<div className="logo">
					<img
						src={logo}
						alt="Logo"
					/>
				</div>
				<div className="userNavbar">
					<Link to={'/profile'}>
						<img
							src={user}
							alt="Profile"
						/>
					</Link>
					<div className="notification-icon-wrapper">
						<Link to={'/notice'}>
							<img
								src={bell}
								alt="Notifications"
							/>
							{isUnreadNotice && <div className="red-dot" />}
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
