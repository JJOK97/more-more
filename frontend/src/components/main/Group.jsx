import React from 'react';
import { Link } from 'react-router-dom';

const Group = ({ group }) => {
	return (
		<Link
			to={`/group/${group.clubCode}`}
			className="main-group-area"
		>
			<img
				src={group.clubImage}
				alt="그룹프로필"
				className="group-profile-image"
			/>
			<div className="group-info-container">
				<div className="group-name">{group.clubName}</div>
				<div className="group-introduction">모임 소개 : {group.clubIntro}</div>
				<div className="group-created-date">개설일 : {group.createdDate}</div>
				<div className="group-member-count">{group.participants.length}</div>
			</div>
		</Link>
	);
};

export default Group;
