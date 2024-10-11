import React, { useEffect, useState } from 'react';
import '@/assets/css/schedule/scheduleBoard/scheduleBoard.css';
import dots from '@/assets/img/common/dots.svg';
import { updateSchedule, deleteSchedule } from '@/api/scheduleAPI';
import { getMemberInfo } from '@/api/userAPI';
import { useParams } from 'react-router-dom';

const ScheduleBoard = ({ schedule, onUpdate, onDelete }) => {
	const { groupId } = useParams();
	const [memberInfo, setMemberInfo] = useState(null); // State to hold member info

	// Function to fetch member info when the component mounts
	const fetchMemberInfo = async () => {
		try {
			const info = await getMemberInfo(schedule.memberId); // Fetch member info using memberId
			setMemberInfo(info); // Store the fetched info in state
		} catch (error) {
			console.error('Failed to fetch member info:', error);
		}
	};

	useEffect(() => {
		fetchMemberInfo(); // Fetch member info when the component mounts
	}, [schedule.memberId]);

	const handleUpdate = async () => {
		await updateSchedule(schedule.clubCode, schedule.scheduleId, updatedScheduleData);
		onUpdate(new Date(schedule.date));
	};

	const handleDelete = async () => {
		await deleteSchedule(schedule.clubCode, schedule.scheduleId);
		onDelete(new Date(schedule.date));
	};

	return (
		<div className="post-body f">
			<div className="img-area">
				{memberInfo ? (
					<img
						className="profile-image"
						src={memberInfo.profileImageUrl} // Use the profile image URL from memberInfo
					/>
				) : (
					// Fallback if image is not available
					<div className="placeholder-profile">Loading...</div>
				)}
			</div>
			<div className="post-area">
				<div className="post-top f">
					<div className="info-area f">
						<div className="name-area">{memberInfo ? memberInfo.name : 'Loading...'}</div>
						<div className="time-area">{schedule.time}</div>
					</div>
					<div className="setting-area f">
						<img
							className="dots"
							src={dots}
							onClick={handleUpdate}
						/>
					</div>
				</div>
				<div className="post-bottom">{schedule.event}</div>
			</div>
		</div>
	);
};

export default ScheduleBoard;
