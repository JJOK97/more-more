import React, { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 CSS 로드
import '@/assets/css/calendar/calendar.css'; // 커스텀 CSS 로드
import moment from 'moment'; // 날짜 형식 변환을 위한 moment.js

function Calendar() {
	const today = new Date(); // 오늘 날짜
	const [date, setDate] = useState(today); // 선택된 날짜 상태
	const [activeStartDate, setActiveStartDate] = useState(today); // 달력에서 보여질 현재 날짜 상태
	const attendDay = ['2023-12-03', '2023-12-13']; // 출석한 날짜 예시

	// 날짜 선택 핸들러
	const handleDateChange = (newDate) => {
		setDate(newDate);
	};

	// 오늘 버튼 클릭 시 오늘 날짜로 이동
	const handleTodayClick = () => {
		const today = new Date();
		setActiveStartDate(today);
		setDate(today);
	};

	return (
		<div className="calendar-wrapper">
			{/* ReactCalendar 컴포넌트 */}
			<ReactCalendar
				value={date}
				onChange={handleDateChange}
				formatDay={(locale, date) => date.getDate()} // 날짜만 표시
				formatYear={(locale, date) => date.getFullYear()} // 년도만 표시
				formatMonthYear={(locale, date) => date.toLocaleDateString(locale, { month: 'long', year: 'numeric' })} // '월 년도' 형식으로 표시 (ex: 2024년 9월)
				calendarType="gregory" // 일요일부터 시작
				showNeighboringMonth={false} // 전달 및 다음달 날짜 숨기기
				next2Label={null} // 1년 단위 이동 버튼 제거
				prev2Label={null} // 1년 단위 이동 버튼 제거
				// 오늘 날짜로 돌아오는 기능
				activeStartDate={activeStartDate}
				onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
				// 오늘 날짜와 출석 날짜에 맞춤형 요소 추가
				tileContent={({ date, view }) => {
					let html = [];
					if (
						view === 'month' &&
						date.getMonth() === today.getMonth() &&
						date.getDate() === today.getDate()
					) {
						// 오늘 날짜에 "오늘" 텍스트 추가
						html.push(
							<div
								key="today"
								className="styled-today"
							>
								오늘
							</div>,
						);
					}
					if (attendDay.includes(moment(date).format('YYYY-MM-DD'))) {
						// 출석한 날짜에 점 추가
						html.push(
							<div
								key={moment(date).format('YYYY-MM-DD')}
								className="styled-dot"
							/>,
						);
					}
					return <>{html}</>;
				}}
			/>
			{/* 오늘 날짜로 이동하는 버튼 */}
			<div
				className="styled-date"
				onClick={handleTodayClick}
			>
				오늘
			</div>
		</div>
	);
}

export default Calendar;
