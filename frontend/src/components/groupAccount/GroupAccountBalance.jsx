import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import arrow from '@/assets/img/account/arrow_right.svg';

const AccountBalance = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const groupId = location.pathname.match(/^\/group\/(\d+)/)?.[1];

	const handleDuesClick = () => {
		if (groupId) {
			navigate(`/group/${groupId}/account/status`);
		}
	};

	const handleFillClick = () => {
		if (groupId) {
			navigate(`/group/${groupId}/account/transfer`);
		}
	};

	const handleSendClick = () => {
		if (groupId) {
			navigate(`/group/${groupId}/account/withDrawal`);
		}
	};

	return (
		<div className="account-balance">
			<div
				className="dues"
				onClick={handleDuesClick}
				style={{ cursor: 'pointer' }}
			>
				<span name="account-due-list">매 월 1일, 10만원씩 | 입금현황</span>
				<img
					className="account-due-list-icon"
					src={arrow}
					alt="move_to_deposit_list"
				/>
			</div>
			<div className="account-balance-info">
				<span name="account-number">3333-02-123456</span>
				<span name="account-balance">3,410,000 원</span>
			</div>
			<div className="account-balance-button">
				<button
					name="fill"
					onClick={handleFillClick}
				>
					채우기
				</button>
				<button
					name="send"
					onClick={handleSendClick}
				>
					보내기
				</button>
			</div>
		</div>
	);
};

export default AccountBalance;
