import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BankSelectModal from './BankSelectModal';
import back from '@/assets/img/account/back.svg';
import '@/assets/css/groupAccount/GroupAccount.css';

const WithdrawalAccountInput = ({ setAccountNumber }) => {
	const navigate = useNavigate();
	const { groupId } = useParams();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBank, setSelectedBank] = useState(null);
	const [inputAccountNumber, setInputAccountNumber] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [accountBalance, setAccountBalance] = useState(0);
	const [loading, setLoading] = useState(true);

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
					setAccountBalance(data.account_balance || 0);
				} catch (e) {
					console.error('Error fetching account info: ', e);
					setAccountBalance(0);
				} finally {
					setLoading(false);
				}
			}
		};
		fetchAccountInfo();
	}, [groupId]);

	// 계좌 확인 함수
	const handleConfirm = () => {
		if (inputAccountNumber.length <= 1) {
			setErrorMessage('올바른 계좌 번호를 입력해주세요.');
			return;
		}
		setErrorMessage('');
		setAccountNumber(inputAccountNumber); // 계좌 번호 설정만 수행
	};

	return (
		<div className="transfer-info">
			<div className="transfer-back">
				<img
					src={back}
					alt="Back"
					onClick={() => navigate(-1)}
				/>
			</div>
			<div className="transfer-account-info">
				<div className="transer-my-account">
					<div className="from-my-account">모임 계좌에서</div>
					<div className="transfer-balance">
						{loading ? '로딩 중...' : `잔액 ${Number(accountBalance).toLocaleString()}원`}
					</div>
				</div>
				<div className="transfer-other-account">
					<div className="to-other-account">내 계좌로 송금</div>
					<div
						className="bank-select"
						onClick={() => setIsModalOpen(true)}
					>
						{selectedBank ? (
							<div className="selected-bank">
								<img
									src={selectedBank.img}
									alt={selectedBank.value}
									className="selected-bank-img"
								/>
							</div>
						) : (
							<div>은행을 선택해주세요</div>
						)}
					</div>
					<div className="account-input">
						<input
							type="text"
							placeholder="계좌번호 입력"
							value={inputAccountNumber}
							onChange={(e) => setInputAccountNumber(e.target.value)}
						/>
					</div>
					{errorMessage && <div className="error-message">{errorMessage}</div>}
					<button onClick={handleConfirm}>계좌 확인</button>
				</div>
			</div>

			{/* 은행 선택 모달 */}
			{isModalOpen && (
				<BankSelectModal
					onClose={() => setIsModalOpen(false)}
					onSelect={(bank) => {
						setSelectedBank(bank);
						setIsModalOpen(false);
					}}
				/>
			)}
		</div>
	);
};

export default WithdrawalAccountInput;
