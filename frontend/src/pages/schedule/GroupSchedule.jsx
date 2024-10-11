// Schedule.jsx
import React, { useEffect, useState, useCallback } from 'react';
import Calendar from '@/components/calendar/Calendar';
import ScheduleBoard from '@/components/scheduleBoard/ScheduleBoard';
import WriteComponent from '@/components/scheduleBoard/WriteComponent';
import '@/assets/css/schedule/schedule.css';
import PostButton from '@/assets/img/common/post-button.svg';
import useGroupName from '@/store/useGroupName';
import { useParams } from 'react-router-dom';
import { getAllSchedules, createSchedule, getMonthlySchedules, getDailySchedules } from '@/api/scheduleAPI';
import moment from 'moment';
import { getDatas } from '../feed/getData';

const Schedule = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams();
	const [groupInfo, setGroupInfo] = useState(null);
	const [isWriting, setIsWriting] = useState(false);
	const [schedules, setSchedules] = useState([]);
	const [monthlySchedules, setMonthlySchedules] = useState([]);
	const [selectedDateSchedules, setSelectedDateSchedules] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [loading, setLoading] = useState(true); // 로딩 상태
	const [feedVisible, setFeedVisible] = useState(false); // 페이드인 효과를 위한 상태
	const [error, setError] = useState(null);
	const [attendDay, setAttendDay] = useState([]);

	// 그룹 정보를 불러오는 useEffect
	useEffect(() => {
		const getGroupInfo = async () => {
			try {
				const url = `https://j11a605.p.ssafy.io/api/club/${groupId}`;
				const data = await getDatas(url);
				setGroupInfo(data);
			} catch (error) {
				console.error('Error fetching group info:', error);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 500); // 로딩 시간을 1초로 변경
			}
		};
		getGroupInfo();
	}, [groupId]);

	// groupInfo가 업데이트될 때, groupName 상태를 업데이트
	useEffect(() => {
		if (groupInfo && groupInfo.clubName) {
			setGroupName(groupInfo.clubName);
		}
	}, [groupInfo, setGroupName]);

	const fetchSchedules = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await getAllSchedules(groupId);
			setSchedules(response.data);
		} catch (error) {
			console.error('스케줄을 가져오는데 실패했습니다:', error);
			setError('스케줄을 가져오는데 실패했습니다. 나중에 다시 시도해주세요.');
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 500); // 로딩 시간을 1초로 변경
		}
	}, [groupId]);

	const fetchMonthlySchedules = useCallback(
		async (yearMonth) => {
			try {
				const response = await getMonthlySchedules(groupId, yearMonth);
				setAttendDay(response);
			} catch (error) {
				console.error('월간 스케줄을 가져오는데 실패했습니다:', error);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 500); // 로딩 시간을 1초로 변경
			}
		},
		[groupId],
	);

	const fetchDailySchedules = useCallback(
		async (date) => {
			try {
				const formattedDate = moment(date).format('YYYY-MM-DD');
				const response = await getDailySchedules(groupId, formattedDate);
				setSelectedDateSchedules(response);
			} catch (error) {
				console.error('일간 스케줄을 가져오는데 실패했습니다:', error);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 500); // 로딩 시간을 1초로 변경
			}
		},
		[groupId],
	);

	useEffect(() => {
		setGroupName(groupId);
		fetchSchedules();
		fetchMonthlySchedules(moment().format('YYYY-MM'));
		fetchDailySchedules(new Date());
	}, [groupId, setGroupName, fetchSchedules, fetchMonthlySchedules, fetchDailySchedules]);

	// 로딩이 끝난 후에 페이드인 효과를 주기 위한 useEffect
	useEffect(() => {
		if (!loading) {
			setFeedVisible(true);
		}
	}, [loading]);

	const handleCreateSchedule = async (newScheduleData) => {
		try {
			const memberId = parseInt(localStorage.getItem('memberId'), 10);
			if (isNaN(memberId)) {
				throw new Error('유효한 memberId가 없습니다.');
			}

			// 스케줄 생성 API 호출
			await createSchedule({ ...newScheduleData, clubCode: groupId, memberId });

			// 상태를 새로고침 없이 업데이트
			fetchSchedules(); // 모든 스케줄 다시 가져오기
			fetchMonthlySchedules(moment(newScheduleData.date).format('YYYY-MM')); // 월간 스케줄 가져오기
			fetchDailySchedules(selectedDate); // 현재 선택된 날짜의 스케줄 가져오기

			// 글쓰기 모드 종료
			setIsWriting(false);
		} catch (error) {
			console.error('스케줄 생성에 실패했습니다:', error);
			setError('스케줄 생성에 실패했습니다. 나중에 다시 시도해주세요.');
		}
	};

	const handleMonthChange = useCallback(
		(date) => {
			const yearMonth = moment(date).format('YYYY-MM');
			fetchMonthlySchedules(yearMonth);
		},
		[fetchMonthlySchedules],
	);

	const handleDateSelect = useCallback(
		(date) => {
			setSelectedDate(date); // 사용자가 클릭한 날짜를 저장
			fetchDailySchedules(date);
		},
		[fetchDailySchedules],
	);

	const formattedDate = moment(selectedDate).format('YYYY년 MM월 DD일');

	return (
		<div className="schedule-wrapper">
			{loading && (
				<div className="loading">
					<span></span>
					<span></span>
					<span></span>
				</div>
			)}
			{!loading && (
				<div className={`schedule-container ${feedVisible ? 'fade-in' : ''}`}>
					<Calendar
						onMonthChange={handleMonthChange}
						onSelectDate={handleDateSelect}
						scheduleDates={attendDay}
					/>
					<div className="schedule-content">
						<div className="selected-date-info">
							<div>{formattedDate}</div>
						</div>
						{selectedDateSchedules.length > 0 ? (
							selectedDateSchedules.map((schedule) => (
								<ScheduleBoard
									key={schedule.scheduleId}
									schedule={schedule}
									onUpdate={fetchDailySchedules}
									onDelete={fetchDailySchedules}
								/>
							))
						) : (
							<div className="noneSchedule">
								<p>선택한 날짜에 스케줄이 없습니다.</p>
							</div>
						)}
					</div>
					{isWriting && (
						<WriteComponent
							selectedDate={selectedDate} // 클릭한 날짜를 WriteComponent로 전달
							onClose={() => setIsWriting(false)}
							onSubmit={handleCreateSchedule}
						/>
					)}
					{!isWriting && (
						<img
							src={PostButton}
							alt="글쓰기 버튼"
							className="floating-button"
							onClick={() => setIsWriting(true)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default Schedule;
