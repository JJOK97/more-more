import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import arrow from '@/assets/img/account/arrow_right.svg';

const AccountBalance = () => {
	const navigate = useNavigate();
	const [accountInfo, setAccountInfo] = useState({
		account_num: '',
		account_balance: 0,
		createdDate: '01',
		dues: 0,
	});
	const [loading, setLoading] = useState(true);

	const { groupId } = useParams();

	useEffect(() => {
		const fetchAccountInfo = async () => {
			if (groupId) {
				try {
					const response = await fetch(`https://j11a605.p.ssafy.io/api/account/${groupId}`, {
						method: 'GET',
					});

					if (!response.ok) {
						throw new Error('Failed to fetch account information');
					}
					const data = await response.json();
					console.log('Fetched Data:', data); // 응답 데이터 확인

					// 응답 데이터에서 정확한 키 사용
					setAccountInfo({
						account_num: data.account_num || '',
						account_balance: data.account_balance || 0,
						createdDate: data.createdDate || '01',
						dues: data.dues || 0,
					});
				} catch (e) {
					console.error('Error fetching account info:', e);
					setAccountInfo({
						account_num: '',
						account_balance: 0,
						createdDate: '01',
						dues: 0,
					});
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
			navigate(`/group/${groupId}/account/transfer`, { status: { mode: 'transfer' } });
		}
	};

	const handleSendClick = () => {
		if (groupId) {
			navigate(`/group/${groupId}/account/withdrawal`, { status: { mode: 'withdrawal' } });
		}
	};

	return (
		<div className="account-balance">
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<div
						className="dues"
						onClick={handleDuesClick}
						style={{ cursor: 'pointer' }}
					>
						<span name="account-due-list">
							매 월 {new Date(accountInfo.createdDate).getDate()}일,{' '}
							{accountInfo.dues?.toLocaleString() || '0'}원씩 | 입금현황
						</span>
						<img
							className="account-due-list-icon"
							src={arrow}
							alt="move_to_deposit_list"
						/>
					</div>
					<div className="account-balance-info">
						{/* 계좌번호는 문자열 그대로 표시 */}
						<span name="account-number">{accountInfo.account_num || 'N/A'}</span>
						{/* 잔액은 숫자로 변환해 포맷 적용 */}
						<span name="account-balance">{Number(accountInfo.account_balance).toLocaleString()} 원</span>
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
				</>
			)}
		</div>
	);
};

export default AccountBalance;
