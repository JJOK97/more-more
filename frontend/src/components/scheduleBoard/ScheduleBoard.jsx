import React from 'react';
import '@/assets/css/schedule/scheduleBoard/scheduleBoard.css';

import dots from '@/assets/img/common/dots.svg';

const ScheduleBoard = ({ schedule }) => {
	return (
		<div className="post-body f">
			<div className="img-area">
				<img
					className="profile-image"
					src={schedule.userProfile}
					alt={`${schedule.userName} 프로필`}
				/>
			</div>
			<div className="post-area">
				<div className="post-top f">
					<div className="info-area f">
						<div className="name-area">{schedule.userName}</div>
						<div className="time-area">{schedule.scheduleTime}</div>
					</div>
					<div className="setting-area f">
						<img
							className="dots"
							src={dots}
						/>
					</div>
				</div>
				<div className="post-bottom">{schedule.scheduleEvent}</div>
			</div>
		</div>
	);
};

export default ScheduleBoard;
