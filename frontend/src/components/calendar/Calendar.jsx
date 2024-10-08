import React, { useState, useEffect } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/assets/css/schedule/calendar/calendar.css';
import moment from 'moment';

function Calendar({ onSelectDate, onMonthChange, scheduleDates }) {
	const today = new Date();
	const [date, setDate] = useState(today);
	const [activeStartDate, setActiveStartDate] = useState(today);
	const [view, setView] = useState('month');

	useEffect(() => {
		if (onMonthChange) {
			onMonthChange(activeStartDate);
		}
	}, [activeStartDate, onMonthChange]);

	const handleDateChange = (newDate) => {
		setDate(newDate);
		if (onSelectDate) {
			onSelectDate(newDate);
		}
	};

	const getButtonText = () => {
		if (view === 'year') {
			return '이번 달';
		} else if (view === 'month') {
			return '오늘';
		}
	};

	const handleButtonClick = () => {
		if (view === 'year') {
			setActiveStartDate(today);
		} else if (view === 'month') {
			setActiveStartDate(today);
			setDate(today);
			if (onSelectDate) {
				onSelectDate(today);
			}
		}
	};

	return (
		<div className="styledCalendarWrapper">
			<ReactCalendar
				value={date}
				onChange={handleDateChange}
				formatDay={(locale, date) => date.getDate()}
				formatYear={(locale, date) => date.getFullYear()}
				formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
				calendarType="gregory"
				showNeighboringMonth={false}
				next2Label={null}
				prev2Label={null}
				minDetail="year"
				activeStartDate={activeStartDate}
				onActiveStartDateChange={({ activeStartDate, view }) => {
					setActiveStartDate(activeStartDate);
					setView(view);
				}}
				onViewChange={({ activeStartDate, view }) => {
					setView(view);
					if (view === 'month') {
						setActiveStartDate(activeStartDate);
					}
				}}
				tileContent={({ date, view }) => {
					let html = [];
					if (
						view === 'month' &&
						date.getMonth() === today.getMonth() &&
						date.getDate() === today.getDate()
					) {
						html.push(
							<div
								key="today"
								className="styledToday"
							>
								오늘
							</div>,
						);
					}
					if (scheduleDates.includes(moment(date).format('YYYY-MM-DD'))) {
						html.push(
							<div
								key={moment(date).format('YYYY-MM-DD')}
								className="styledDot"
							/>,
						);
					}
					return <>{html}</>;
				}}
			/>
			<div
				className="styledDate"
				onClick={handleButtonClick}
			>
				{getButtonText()}
			</div>
		</div>
	);
}

export default Calendar;
