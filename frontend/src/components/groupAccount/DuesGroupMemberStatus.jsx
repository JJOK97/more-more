import React, { useState, useEffect } from 'react';

import '@/assets/css/groupAccount/ProgressBar.css';

import checkOn from '@/assets/img/account/check-on.svg';
import checkOff from '@/assets/img/account/check-off.svg';

const DuesGroupMemberStatus = () => {
	const [members, setMembers] = useState([
		{ name: '신승호', isPaid: false },
		{ name: '박정선', isPaid: true },
		{ name: '권주안', isPaid: true },
		{ name: '박지환', isPaid: false },
		{ name: '이재성', isPaid: false },
		{ name: '옥진석', isPaid: false },
		{ name: '옥장석', isPaid: true },
		{ name: '박옥정', isPaid: false },
		{ name: '옥장석박', isPaid: true },
		{ name: '석석이', isPaid: true },
	]);

	const [completedPercentage, setCompletedPercentage] = useState(0);

	useEffect(() => {
		const paidMembers = members.filter((member) => member.isPaid).length;
		const percentage = Math.round((paidMembers / members.length) * 100);
		setCompletedPercentage(percentage);
	}, [members]);

	return (
		<div className="dues-group-member-status">
			<div>모임원 납부 현황</div>
			<div className="dues-member-gather-count">
				<div className="dues-people-count">
					{members.filter((member) => member.isPaid).length} / {members.length} 명 완료
				</div>
				<div>
					<span className="dues-gather">400,000원 </span>모임
				</div>
			</div>
			<div className="progress-bar">
				<div className="wrapper">
					<div className="container">
						<div
							className="completedBar"
							style={{ width: `${completedPercentage}%` }}
						>
							<span className="label">{`${completedPercentage}%`}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="dues-member-list">
				{members.map((member, index) => (
					<div
						className="dues-one-member"
						key={member.name}
					>
						<img
							src={member.isPaid ? checkOn : checkOff}
							alt={member.isPaid ? '납부 완료' : '납부 미완료'}
							className="checkbox-Img"
						/>
						<label>{member.name}</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default DuesGroupMemberStatus;
