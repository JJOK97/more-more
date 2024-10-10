import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/img/account/back.svg';

const TransferInfo = () => {
	const navigate = useNavigate();
	const { groupId } = useParams();
	const [memberInfo, setMemberInfo] = useState({ account_balance: 0, bankName: '' });
	const [accountInfo, setAccountInfo] = useState({ account_num: '', account_balance: 0 });
	const [clubName, setClubName] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		const memberId = localStorage.getItem('memberId');

		if (!memberId) {
			setError('Member ID가 존재하지 않습니다.');
			return;
		}

		const fetchMemberInfo = async () => {
			try {
				const memberResponse = await fetch(`https://j11a605.p.ssafy.io/api/account/${memberId}/accountBalance`);
				if (!memberResponse.ok) {
					throw new Error(`HTTP error! status: ${memberResponse.status}`);
				}
				const memberData = await memberResponse.json();
				setMemberInfo({
					account_balance: memberData.balance,
					bankName: memberData.bankName,
				});
			} catch (e) {
				setError(`개인 계좌 정보를 가져오는 중 문제가 발생했습니다. 상태 코드: ${e.message}`);
			}
		};

		const fetchAccountInfo = async () => {
			try {
				const clubResponse = await fetch(`https://j11a605.p.ssafy.io/api/account/${groupId}`);
				if (!clubResponse.ok) {
					throw new Error(`HTTP error! status: ${clubResponse.status}`);
				}
				const clubData = await clubResponse.json();
				setAccountInfo({
					account_num: clubData.account_num,
					account_balance: clubData.account_balance,
				});
			} catch (e) {
				setError(`모임 계좌 정보를 가져오는 중 문제가 발생했습니다. 상태 코드: ${e.message}`);
			}
		};

		const fetchClubName = async () => {
			try {
				const clubResponse = await fetch(`https://j11a605.p.ssafy.io/api/club/${groupId}`);
				if (!clubResponse.ok) {
					throw new Error(`HTTP error! status: ${clubResponse.status}`);
				}
				const clubData = await clubResponse.json();
				setClubName(clubData.clubName);
			} catch (e) {
				setError(`모임 이름을 가져오는 중 문제가 발생했습니다. 상태 코드: ${e.message}`);
			}
		};

		fetchMemberInfo();
		fetchAccountInfo();
		fetchClubName();
	}, [groupId]);

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
						<div className="transfer-my-account">
							<div className="from-my-account">내 {memberInfo.bankName} 입출금 계좌에서</div>
							<div className="transfer-balance">잔액 {memberInfo.account_balance.toLocaleString()}원</div>
						</div>
						<div className="transfer-group-account">
							<div className="to-group-account">{clubName || '모임'} 계좌로</div>
							<div className="transfer-balance">
								잔액 {accountInfo.account_balance.toLocaleString()}원
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default TransferInfo;
