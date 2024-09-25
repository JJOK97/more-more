import React from 'react';
import { Link } from 'react-router-dom';

const Group = ({ group }) => {
	return (
		<Link
			to={`/group/${group.groupId}`}
			className="main-group-area"
		>
			<img
				src={group.profileImage}
				alt="그룹프로필"
				className="group-profile-image"
			/>
			<div className="group-info-container">
				<div className="group-name">
					{group.groupName}({group.numberOfPeople})
				</div>
				<div className="group-created-date">{group.createdDate}</div>
				<div className="group-introduction">{group.introduction}</div>
				{/* <div className="group-member-count"></div> */}
			</div>
		</Link>
	);
};

export default Group;
