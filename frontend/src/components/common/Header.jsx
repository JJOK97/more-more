import React from 'react';

import '@/assets/css/common/header.css';
import logo from '@/assets/img/header/More More.svg';
import search from '@/assets/img/header/search.svg';
import user from '@/assets/img/header/user.svg';
import bell from '@/assets/img/header/bell.svg';

const Header = () => {
	return (
		<header>
			<div className="logo">
				<img src={logo}></img>
			</div>
			<div className="userNavbar">
				<img src={search}></img>
				<img src={user}></img>
				<img src={bell}></img>
			</div>
		</header>
	);
};

export default Header;
