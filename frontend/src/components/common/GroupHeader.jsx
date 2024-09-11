import React from 'react';

import '@/assets/css/common/header.css';

import chevron from '@/assets/img/common/mainHeader/chevron-left.svg';
import user from '@/assets/img/common/mainHeader/user.svg';
import bell from '@/assets/img/common/mainHeader/bell.svg';
import { useLocation } from 'react-router-dom';

const Header = () => {
	const location = useLocation();
	if(location.pathname === '/') return null;
	return (
		<header>
			<div className="menu">
				<div className="headLeft">
					<div className="groupName">
						<img src={chevron}></img>
						<div> 옥냥이네 가족 </div>
					</div>
				</div>
				<div className="headerRight">
					<img src={user}></img>
					<img src={bell}></img>
				</div>
			</div>
		</header>
	);
};

export default Header;
