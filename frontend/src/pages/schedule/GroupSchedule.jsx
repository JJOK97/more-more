import React, { useState } from 'react';

import Calendar from '@/components/calendar/Calendar';
import ScheduleBoard from '@/components/scheduleBoard/ScheduleBoard';
import WriteComponent from '@/components/scheduleBoard/WriteComponent';

import datas from '@/pages/schedule/data.json';

import '@/assets/css/schedule/schedule.css';

import PostButton from '@/assets/img/common/post-button.svg';

const Schedule = () => {
	const [isWriting, setIsWriting] = useState(false);
	const schedules = datas.schedules;

	return (
		<div className="body">
			<Calendar />
			<div className="schedule-container">
				{schedules
					? schedules.map((schedule) => (
							<ScheduleBoard
								key={schedule.scheduleId}
								schedule={schedule}
							/>
					  ))
					: ''}
			</div>
			{isWriting && <WriteComponent onClose={() => setIsWriting(false)} />}
			{!isWriting && (
				<img
					src={PostButton}
					alt="글쓰기 버튼"
					className="floating-button"
					onClick={() => setIsWriting(true)}
				/>
			)}
		</div>
	);
};

export default Schedule;
