import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '@/assets/css/common/header.css';
import chevron from '@/assets/img/common/mainHeader/chevron-left.svg';
import search from '@/assets/img/common/mainHeader/search.svg';
import user from '@/assets/img/common/mainHeader/user.svg';
import bell from '@/assets/img/common/mainHeader/bell.svg';
import useGroupName from '@/store/useGroupName';
import useNoticeState from '@/store/useNoticeState'; // zustand store 가져오기

const Header = () => {
	const { groupName } = useGroupName();
	const { isUnreadNotice } = useNoticeState(); // 읽지 않은 알림 상태 확인
	const location = useLocation();
	const navigate = useNavigate();

	if (
		location.pathname === '/' ||
		location.pathname === '/login' ||
		location.pathname === '/signup' ||
		location.pathname === '/profile' ||
		location.pathname === '/notice' ||
		location.pathname.match(/^\/group\/[^\/]+\/account\/withDrawal/) ||
		location.pathname.match(/^\/group\/[^\/]+\/account\/transfer/) ||
		location.pathname.match(/^\/group\/[^\/]+\/account\/transfer-question/) ||
		location.pathname.match(/^\/group\/[^\/]+\/account\/transfer-check/)
	) {
		return null;
	}

	// 현재 경로가 그룹의 메인 페이지(Feed)인지 확인
	const isGroupFeedPage = location.pathname.match(/^\/group\/[^/]+$/);

	return (
		<header className="common-header">
			<div className="menu">
				<div className="headLeft">
					<div className="groupName">
						<img
							className="group-header-back-button-img"
							src={chevron}
							alt="Back"
							onClick={() => navigate(-1)}
						/>
						<div>{groupName}</div>
					</div>
				</div>
				<div className="headerRight">
					{isGroupFeedPage && (
						<Link to={`${location.pathname}/search`}>
							<img
								src={search}
								alt="Search"
							/>
						</Link>
					)}
					<Link to={'/profile'}>
						<img
							src={user}
							alt="User"
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
