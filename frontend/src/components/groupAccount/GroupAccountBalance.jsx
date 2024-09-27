import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import arrow from '@/assets/img/account/arrow_right.svg';

const AccountBalance = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// 현재 경로에서 groupId 추출
	const groupId = location.pathname.match(/^\/group\/(\d+)/)?.[1];

	// 입금 현황 클릭 시 경로 이동
	const handleDuesClick = () => {
		if (groupId) {
			navigate(`/group/${groupId}/account/status`);
		}
	};

	// 채우기 클릭 시 경로 이동
	const handleFillClick = () => {
		if (groupId) {
			navigate(`/group/${groupId}/account/transfer`);
		}
	};

	return (
		<div className="account-balance">
			<div
				className="dues"
				onClick={handleDuesClick}
				style={{ cursor: 'pointer' }}
			>
				<span>매 월 1일, 10만원씩 | 입금현황</span>
				<img
					src={arrow}
					alt="move_to_deposit_list"
				/>
			</div>
			<div className="account-balance-info">
				<span>3333-02-123456</span>
				<span>3,410,000 원</span>
			</div>
			<div className="account-balance-button">
				<button
					name="fill"
					onClick={handleFillClick}
				>
					채우기
				</button>
				<button name="send">보내기</button>
			</div>
		</div>
	);
};

export default AccountBalance;
