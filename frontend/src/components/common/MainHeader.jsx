import React from 'react';

import '@/assets/css/common/header.css';
import logo from '@/assets/img/common/mainHeader/text-logo.svg';
import search from '@/assets/img/common/mainHeader/search.svg';
import user from '@/assets/img/common/mainHeader/user.svg';
import bell from '@/assets/img/common/mainHeader/bell.svg';

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
