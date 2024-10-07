import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import arrow from '@/assets/img/account/arrow_right.svg';

const AccountBalance = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [accountInfo, setAccountInfo] = useState({
		accountNumber: '',
		balance: 0,
		createdDate: '01',
		dues: 0,
	});
	const [loading, setLoading] = useState(true);

	const groupId = location.pathname.match(/^\/group\/(\d+)/)?.[1];

	useEffect(() => {
		const fetchAccountInfo = async () => {
			if (groupId) {
				try {
					const response = await fetch(`/api/group/${groupId / account}`);
					const data = await response.json();

					setAccountInfo({
						accountNumber: data.accountNumber,
						balance: data.balance,
						createdDate: data.createdDate,
						dues: data.dues,
					});
				} catch (e) {
					console.error('Error fetching account info:', e);
				} finally {
					setLoading(false);
				}
			}
		};
		fetchAccountInfo();
	}, [groupId]);

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
				<span name="account-due-list">
					매 월 {new Date(accountInfo.createdDate).getDate()}일, {accountInfo.dues.toLocaleString()}원씩 |
					입금현황
				</span>
				<img
					className="account-due-list-icon"
					src={arrow}
					alt="move_to_deposit_list"
				/>
			</div>
			<div className="account-balance-info">
				<span name="account-number">{accountInfo.accountNumber}</span>
				<span name="account-balance">{accountInfo.balance.toLocaleString()} 원</span>
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
