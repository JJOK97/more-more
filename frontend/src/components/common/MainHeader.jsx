import React from 'react';

import '@/assets/css/common/header.css';
import logo from '@/assets/img/common/text-logo.svg';
import search from '@/assets/img/common/mainHeader/search.svg';
import user from '@/assets/img/common/mainHeader/user.svg';
import bell from '@/assets/img/common/mainHeader/bell.svg';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
	const location = useLocation();
	if (location.pathname !== '/' || location.pathname == '/login' || location.pathname == '/signup') return null;
	return (
		<header className="common-header">
			<div className="menu">
				<div className="logo">
					<img src={logo}></img>
				</div>
				<div className="userNavbar">
					<img src={search}></img>
					<Link to={'/profile'}>
						<img src={user}></img>
					</Link>
					<img src={bell}></img>
				</div>
			</div>
		</header>
	);
};

export default Header;
