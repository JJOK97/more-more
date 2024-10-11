import React, { useState } from 'react';
import Calendar from '@/components/calendar/Calendar';
import GroupAccountDepositList from '@/components/groupAccount/GroupAccountDepositList';
import { useTagNameStore } from '@/store/useTagNameStore';
import '@/assets/css/modal/modal.css';

const AddTagModal = ({ onClose }) => {
	console.log('AddTagModal - onClose: ', onClose);
	const { setTagName } = useTagNameStore();

	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	const handleTagClick = (tagName) => {
		setTagName(tagName);
		console.log('Tag clicked: ', tagName);
		onClose();
	};

	const toggleCalendar = () => {
		setIsCalendarOpen((prevState) => !prevState);
	};

	return (
		<div
			className="invite-modal-overlay"
			onClick={onClose}
		>
			<div
				className="modal-content"
				onClick={(e) => e.stopPropagation()}
			>
				{/* 캘린더 열기/닫기 버튼 */}
				<button
					className="toggle-calendar-button"
					onClick={toggleCalendar}
				>
					{isCalendarOpen ? '캘린더 닫기' : '캘린더 열기'}
				</button>

				{/* 애니메이션을 위한 캘린더 컨테이너 */}
				<div className={`calendar-container ${isCalendarOpen ? 'open' : 'closed'}`}>
					<Calendar />
				</div>

				<GroupAccountDepositList
					onTagClick={handleTagClick}
					onClose={onClose}
				/>
			</div>
		</div>
	);
};

export default AddTagModal;
