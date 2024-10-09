import React from 'react';
import './InviteModal.css';

const InviteModal = ({ onClose, groupId }) => {
	const inviteLink = `https://j11a605.p.ssafy.io/group/${groupId}/invite`;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(inviteLink);
		alert('초대 링크가 클립보드에 복사되었습니다.');
	};

	return (
		<div
			className="invite-modal-overlay"
			onClick={onClose}
		>
			<div
				className="invite-modal"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="invite-modal-header">
					<div className='invite-modal-label'>멤버 초대</div>
					<button
						className="invite-modal-close"
						onClick={onClose}
					>
						x
					</button>
				</div>
				<div className="invite-modal-body">
					<p>아래 링크를 공유하여 멤버를 초대하세요</p>
					<div className="invite-link-container">
						<input
							type="text"
							value={inviteLink}
							readOnly
							className="invite-link-input"
						/>
						<button
							className="copy-button"
							onClick={copyToClipboard}
						>
							복사
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InviteModal;
