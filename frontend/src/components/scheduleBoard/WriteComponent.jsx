// WriteComponent.jsx
import React, { useState } from 'react';
import Rolldate from 'rolldate';

import '@/assets/css/schedule/scheduleBoard/writeComponent.css';

const WriteComponent = ({ onClose }) => {
	const [isSelectingDateTime, setIsSelectingDateTime] = useState(false);
	const [selectedDateTime, setSelectedDateTime] = useState('');

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

	const handleRegister = (e) => {
		e.preventDefault();
		console.log('선택된 날짜 및 시간:', selectedDateTime);
		onClose();
	};

	const handleCancel = () => {
		onClose();
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
					<form
						onSubmit={handleRegister}
						className="write-form"
					>
						<div className="form-group">
							<label htmlFor="content">내용</label>
							<textarea
								id="content"
								placeholder="내용을 입력하세요"
								required
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
								onClick={handleCancel}
							>
								취소
							</button>
							<button
								type="submit"
								className="submit-button"
							>
								등록
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default WriteComponent;
