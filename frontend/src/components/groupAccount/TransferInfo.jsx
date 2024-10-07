import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/img/account/back.svg';

const TransferInfo = () => {
	const navigate = useNavigate();
	const { clubCode } = useParams();
	const [accountInfo, setAccountInfo] = useState({ account_num: '', account_balance: 0 });
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAccountInfo = async () => {
			try {
				const response = await fetch(`/api/account/${clubCode}}`);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setAccountInfo({
					account_num: data.account_num,
					account_balance: data.account_balance,
				});
			} catch (e) {
				console.error('Error fetching account info:', e);
				setError('계좌 정보를 가져오는 중 문제가 발생했습니다.');
			}
		};
		fetchAccountInfo();
	}, [clubCode]);

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
				{error ? (
					<div className="error-message">{error}</div>
				) : (
					<>
						<div className="transer-my-account">
							<div className="from-my-account">내 하나은행 입출금 계좌에서</div>
							<div className="transfer-balance">
								잔액 {Number(accountInfo.account_balance).toLocaleString()}원
							</div>
						</div>
						<div className="transfer-group-account">
							<div className="to-group-account">가족모임 계좌로</div>
							<div className="transfer-account">싸피 뱅크 {accountInfo.account_num}</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default TransferInfo;
