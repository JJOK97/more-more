import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import '@/assets/css/common/groupFooter.css';

import boardOn from '@/assets/img/common/groupFooter/board-on.svg';
import boardOff from '@/assets/img/common/groupFooter/board-off.svg';
import accountOn from '@/assets/img/common/groupFooter/account-on.svg';
import accountOff from '@/assets/img/common/groupFooter/account-off.svg';
import calendarOn from '@/assets/img/common/groupFooter/calendar-on.svg';
import calendarOff from '@/assets/img/common/groupFooter/calendar-off.svg';
import settingOn from '@/assets/img/common/groupFooter/setting-on.svg';
import settingOff from '@/assets/img/common/groupFooter/setting-off.svg';

const Footer = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// 특정 경로에서는 Footer를 렌더링하지 않음
	if (
		['/', '/login', '/signup', '/profile', '/notice', '/create'].includes(location.pathname) ||
		location.pathname.match(/^\/group\/\d+\/account\/transfer/) // 동적 경로 패턴 처리
	) {
		return null;
	}

	// 정규식을 사용하여 동적 경로 비교
	const isBoardActive = /^\/group\/\d+$/.test(location.pathname);
	const isAccountActive = /^\/group\/\d+\/account$/.test(location.pathname);
	const isCalendarActive = /^\/group\/\d+\/schedule$/.test(location.pathname);
	const isSettingActive = /^\/group\/\d+\/info$/.test(location.pathname);

	const handleNavigation = (path) => {
		// groupId를 추출하여 경로에 반영
		const groupId = location.pathname.match(/^\/group\/(\d+)/)?.[1];
		if (groupId) {
			navigate(path.replace(':groupId', groupId));
		}
	};

	return (
		<footer>
			<div className="navbar">
				<img
					src={isBoardActive ? boardOn : boardOff}
					alt="Board"
					onClick={() => handleNavigation('/group/:groupId')}
				/>
				<img
					src={isAccountActive ? accountOn : accountOff}
					alt="Account"
					onClick={() => handleNavigation('/group/:groupId/account')}
				/>
				<img
					src={isCalendarActive ? calendarOn : calendarOff}
					alt="Calendar"
					onClick={() => handleNavigation('/group/:groupId/schedule')}
				/>
				<img
					src={isSettingActive ? settingOn : settingOff}
					alt="Setting"
					onClick={() => handleNavigation('/group/:groupId/info')}
				/>
			</div>
		</footer>
	);
};

export default Footer;
