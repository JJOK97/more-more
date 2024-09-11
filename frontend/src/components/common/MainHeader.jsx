import React from 'react';

import '@/assets/css/common/mainHeader.css';
import logo from '@/assets/img/mainHeader/text-logo.svg';
import search from '@/assets/img/mainHeader/search.svg';
import user from '@/assets/img/mainHeader/user.svg';
import bell from '@/assets/img/mainHeader/bell.svg';

const Header = () => {
	return (
		<header>
			<div className="menu">
				<div className="logo">
					<img src={logo}></img>
				</div>
				<div className="userNavbar">
					<img src={search}></img>
					<img src={user}></img>
					<img src={bell}></img>
				</div>
			</div>
		</header>
	);
};

export default Header;
