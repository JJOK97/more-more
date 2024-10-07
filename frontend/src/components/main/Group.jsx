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
				<div className="group-name">
					{group.clubName}({group.participants.length})
				</div>
				<div className="group-created-date">{group.createdDate}</div>
				<div className="group-introduction">{group.clubIntro}</div>
				{/* <div className="group-member-count"></div> */}
			</div>
		</Link>
	);
};

export default Group;
