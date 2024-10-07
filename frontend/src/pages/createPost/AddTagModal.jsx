import React from 'react';
import Calendar from '@/components/calendar/Calendar'
import GroupAccountDepositList from '@/components/groupAccount/GroupAccountDepositList'

const AddTagModal = ({ onClose }) => {
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
                <GroupAccountDepositList />
			</div>
		</div>
	);
};

export default AddTagModal;
