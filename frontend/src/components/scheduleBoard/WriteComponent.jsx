import React, { useState, useEffect } from 'react';
import Rolldate from 'rolldate';
import '@/assets/css/schedule/scheduleBoard/writeComponent.css';
import moment from 'moment'; // 날짜 형식 처리를 위해 moment.js를 사용

const WriteComponent = ({ onClose, onSubmit, selectedDate }) => {
	const [isSelectingDateTime, setIsSelectingDateTime] = useState(false);
	const [selectedDateTime, setSelectedDateTime] = useState('');
	const [content, setContent] = useState('');

	// 컴포넌트가 마운트될 때 selectedDate를 기본값으로 설정
	useEffect(() => {
		if (selectedDate) {
			const formattedDate = moment(selectedDate).format('YYYY-MM-DD HH:mm');
			setSelectedDateTime(formattedDate);
		}
	}, [selectedDate]);

	const handleDateTimeClick = () => {
		setIsSelectingDateTime(true);

		const rolldate = new Rolldate({
			format: 'YYYY-MM-DD hh:mm',
			beginYear: 2000,
			endYear: 2100,
			lang: {
				title: '<div class="rolldate-title"> 날짜 및 시간 선택 </div>',
				cancel: '취소',
				confirm: '확인',
				year: '년',
				month: '월',
				day: '일',
				hour: '시',
				min: '분',
				sec: '초',
			},
			init: (date) => {
				// 기본값 설정 (selectedDate가 있는 경우 해당 날짜로)
				if (selectedDateTime) {
					return new Date(selectedDateTime);
				}
				return date; // 기본 날짜
			},
			confirm: (date) => {
				console.log('선택된 날짜 및 시간:', date);
				setSelectedDateTime(date);
				setIsSelectingDateTime(false);
			},
			cancel: () => {
				setIsSelectingDateTime(false);
			},
		});
		rolldate.show();
	};

	const handleRegister = () => {
		const [date, time] = selectedDateTime.split(' '); // 날짜와 시간 분리
		onSubmit({
			event: content,
			date,
			time,
		});
	};

	return (
		<div
			className="write-modal-overlay"
			onClick={onClose}
		>
			{!isSelectingDateTime && (
				<div
					className="write-component"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="form-group">
						<label htmlFor="content">내용</label>
						<textarea
							id="content"
							placeholder="내용을 입력하세요"
							required
							value={content}
							onChange={(e) => setContent(e.target.value)}
						></textarea>
					</div>
					<div className="form-group">
						<input
							id="dateTime"
							type="text"
							value={selectedDateTime}
							placeholder="날짜 및 시간을 선택하세요"
							readOnly
							required
							onClick={handleDateTimeClick}
						/>
					</div>
					<div className="button-group">
						<button
							type="button"
							className="cancel-button"
							onClick={onClose}
						>
							취소
						</button>
						<button
							type="button"
							className="submit-button"
							onClick={handleRegister}
						>
							등록
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default WriteComponent;
