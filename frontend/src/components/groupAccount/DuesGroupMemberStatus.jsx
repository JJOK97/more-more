import React, { useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import '@/assets/css/groupAccount/ProgressBar.css';

const DuesGroupMemberStatus = () => {
	const [members, setMembers] = useState([
		{ name: '신승호', isPaid: true },
		{ name: '박정선', isPaid: true },
		{ name: '권주안', isPaid: true },
		{ name: '박지환', isPaid: false },
		{ name: '이재성', isPaid: false },
		{ name: '옥진석', isPaid: false },
		{ name: '옥장석', isPaid: true },
		{ name: '박옥정', isPaid: false },
		{ name: '옥장석박', isPaid: true },
		{ name: '석석이', isPaid: false },
	]);

	const handleCheck = (index) => {
		const updatedMembers = [...members];
		updatedMembers[index].isPaid = !updatedMembers[index].isPaid;
		setCheckedMembers(updatedMembers);
	};

	const completedPercentage = Math.round((members.filter((member) => member.isPaid).length / members.length) * 100);

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
				<ProgressBar
					completed={completedPercentage}
					className="wrapper"
					barContainerClassName="container"
					completedClassName="barCompleted"
					labelClassName="label"
					labelAlignment="center"
				/>
			</div>
			<div className="dues-member-list">
				{members.map((member, index) => (
					<div
						className="dues-one-member"
						key={member.name}
					>
						<input
							type="checkbox"
							checked={member.isPaid}
							onChange={() => handleCheck(index)}
							disabled
						/>
						<label>{member.name}</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default DuesGroupMemberStatus;
