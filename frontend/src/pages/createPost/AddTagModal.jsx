import React from 'react';
import Calendar from '@/components/calendar/Calendar';
import GroupAccountDepositList from '@/components/groupAccount/GroupAccountDepositList';
import { useTagNameStore } from '@/store/useTagNameStore';

const AddTagModal = ({ onClose }) => {
	console.log('AddTagModal - onClose: ', onClose);
	const { setTagName } = useTagNameStore();

	const handleTagClick = (tagName) => {
		setTagName(tagName);
		console.log('Tag clicked: ', tagName);
		onClose();
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
				<span
					className="close-button"
					onClick={onClose}
				>
					&times;
				</span>
				<Calendar />
				<GroupAccountDepositList
					onTagClick={handleTagClick}
					onClose={onClose}
				/>
			</div>
		</div>
	);
};

export default AddTagModal;
