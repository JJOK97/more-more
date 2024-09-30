import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BankSelectModal from './BankSelectModal';
import back from '@/assets/img/account/back.svg';
import '@/assets/css/groupAccount/GroupAccount.css';

const WithDrawalInfo = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBank, setSelectedBank] = useState(null);
	const [accountNumber, setAccountNumber] = useState('');

	// 계좌 확인 함수
	const handleConfirm = () => {
		if (accountNumber.length !== 14) {
			alert('올바른 계좌 번호를 입력해주세요.');
			return;
		}
		alert(`계좌 확인 완료: ${selectedBank?.label} - ${accountNumber}`);
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
					<div className="from-my-account">내 하나은행 입출금 계좌에서</div>
					<div className="transfer-balance">잔액 1,000,000원</div>
				</div>
				<div className="transfer-other-account">
					<div className="to-other-account">다른 사람의 계좌로 송금</div>
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
							value={accountNumber}
							onChange={(e) => setAccountNumber(e.target.value)}
						/>
					</div>
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

export default WithDrawalInfo;
