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

	if (
		['/', '/login', '/signup', '/profile', '/notice', '/create'].includes(location.pathname) ||
		location.pathname.match(/^\/group\/[^\/]+\/account\/transfer/) ||
		location.pathname.match(/^\/group\/[^\/]+\/account\/withDrawal/)
	) {
		return null;
	}

	const isAccountActive = /^\/group\/[^\/]+\/account(\/.*)?$/.test(location.pathname);
	const isCalendarActive = /^\/group\/[^\/]+\/schedule(\/.*)?$/.test(location.pathname);
	const isSettingActive = /^\/group\/[^\/]+\/info(\/.*)?$/.test(location.pathname);
	const isBoardActive =
		/^\/group\/[^\/]+(\/.*)?$/.test(location.pathname) && !isAccountActive && !isCalendarActive && !isSettingActive;

	const handleNavigation = (path) => {
		const groupId = location.pathname.split('/')[2]; // 그룹 ID 추출
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
