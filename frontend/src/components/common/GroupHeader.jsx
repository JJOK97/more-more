import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '@/assets/css/common/header.css';
import chevron from '@/assets/img/common/mainHeader/chevron-left.svg';
import search from '@/assets/img/common/mainHeader/search.svg';
import user from '@/assets/img/common/mainHeader/user.svg';
import bell from '@/assets/img/common/mainHeader/bell.svg';
import useGroupName from '@/store/useGroupName';
import datas from '@/components/main/data.json';

const Header = () => {
	const groups = datas.groups;
	const { groupName } = useGroupName();
	const location = useLocation();
	const navigate = useNavigate();

	const currentGroup = groups.find((group) => group.groupId === parseInt(groupName));

	const displayedGroupName = currentGroup ? currentGroup.groupName : '';

	if (
		location.pathname === '/' ||
		location.pathname === '/login' ||
		location.pathname === '/signup' ||
		location.pathname === '/profile' ||
		location.pathname === '/notice' ||
		location.pathname.match(/^\/group\/\d+\/account\/transfer/) ||
		location.pathname.match(/^\/group\/\d+\/account\/transfer-question/) ||
		location.pathname.match(/^\/group\/\d+\/account\/transfer-check/)
	) {
		return null;
	}

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
						<div>{displayedGroupName}</div>
					</div>
				</div>
				<div className="headerRight">
					<Link>
						<img
							src={search}
							alt="Search"
						/>
					</Link>
					<Link to={'/profile'}>
						<img
							src={user}
							alt="User"
						/>
					</Link>
					<Link to={'/notice'}>
						<img
							src={bell}
							alt="Notifications"
						/>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
