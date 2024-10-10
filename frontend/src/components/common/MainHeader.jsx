import React, { useEffect } from 'react';
import '@/assets/css/common/header.css'; // CSS 파일 참조
import logo from '@/assets/img/common/text-logo.svg';
import user from '@/assets/img/common/mainHeader/user.svg';
import bell from '@/assets/img/common/mainHeader/bell.svg';
import { Link, useLocation } from 'react-router-dom';
import useNoticeState from '@/store/useNoticeState'; // Zustand store 가져오기

import { requestNotificationPermission } from '@/api/firebaseMessaging';

const Header = () => {
	const location = useLocation();
	const { isUnreadNotice } = useNoticeState(); // 읽지 않은 알림 상태 확인

	useEffect(() => {
		requestNotificationPermission();
	}, []);

	console.log('헤더 컴포넌트에서 알림 상태 확인: ', isUnreadNotice);

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
							{isUnreadNotice && <div className="red-dot" />} {/* 빨간 점 표시 */}
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
