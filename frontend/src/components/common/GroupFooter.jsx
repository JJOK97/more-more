import React from 'react';

import '@/assets/css/common/groupFooter.css';

import boardOn from '@/assets/img/groupFooter/board-on.svg';
import boardOff from '@/assets/img/groupFooter/board-off.svg';
import accountOn from '@/assets/img/groupFooter/account-on.svg';
import accountOff from '@/assets/img/groupFooter/account-off.svg';
import calendarOn from '@/assets/img/groupFooter/calendar-on.svg';
import calendarOff from '@/assets/img/groupFooter/calendar-off.svg';
import settingOn from '@/assets/img/groupFooter/setting-on.svg';
import settingOff from '@/assets/img/groupFooter/setting-off.svg';

const Footer = () => {
	return (
		<footer>
			<div className="navbar">
				<img src={boardOff}></img>
				<img src={accountOff}></img>
				<img src={calendarOff}></img>
				<img src={settingOff}></img>
			</div>
		</footer>
	);
};

export default Footer;
