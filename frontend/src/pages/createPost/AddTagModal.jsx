import React, { useState, useEffect } from 'react';
import Calendar from '@/components/calendar/Calendar';
import GroupAccountDepositList from '@/components/groupAccount/GroupAccountDepositList';
import { useTagNameStore } from '@/store/useTagNameStore';
import { useParams } from 'react-router-dom';
import '@/assets/css/modal/modal.css';

const AddTagModal = ({ onClose }) => {
	console.log('AddTagModal - onClose: ', onClose);
	const { setTagName } = useTagNameStore();
	const { groupId } = useParams();

	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [scheduleDates, setScheduleDates] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);

	// 테스트 그룹의 거래 내역 날짜들을 가져오는 useEffect
	useEffect(() => {
		if (groupId.startsWith('TEST')) {
			// 테스트 그룹의 샘플 데이터와 동일한 날짜들
			const sampleDates = [
				'2025-06-23', // 20250623
				'2025-03-20', // 20250320
				'2025-03-15', // 20250315
				'2025-04-10', // 20250410
				'2025-04-12', // 20250412
				'2025-05-05', // 20250505
				'2025-05-10', // 20250510
				'2025-06-15', // 20250615
				'2025-06-18', // 20250618
			];
			setScheduleDates(sampleDates);
		}
	}, [groupId]);

	const handleTagClick = (tagName) => {
		setTagName(tagName);
		onClose();
	};

	const handleDateSelect = (date) => {
		setSelectedDate(date);
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
					<Calendar
						scheduleDates={scheduleDates}
						onSelectDate={handleDateSelect}
					/>
				</div>

				<GroupAccountDepositList
					selectedDate={selectedDate}
					onTagClick={handleTagClick}
					onClose={onClose}
				/>
			</div>
		</div>
	);
};

export default AddTagModal;
