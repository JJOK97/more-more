import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/img/account/back.svg';

const TransferInfo = () => {
	const navigate = useNavigate();
	const { groupId } = useParams(); // groupId로 가져오기
	const [memberInfo, setMemberInfo] = useState({ account_balance: 0 });
	const [accountInfo, setAccountInfo] = useState({ account_num: '', account_balance: 0 });
	const [error, setError] = useState(null);

	useEffect(() => {
		const memberId = localStorage.getItem('memberId');

		console.log(memberId);
		if (!memberId) {
			setError('Member ID가 존재하지 않습니다.');
			return;
		}

		const fetchMemberInfo = async () => {
			try {
				console.log('Fetching account info for memberId:', memberId); // memberId가 올바른지 확인
				const memberResponse = await fetch(`https://j11a605.p.ssafy.io/api/account/${memberId}/accountBalance`);

				console.log(memberResponse);
				if (!memberResponse.ok) {
					throw new Error(`HTTP error! status: ${memberResponse.status}`);
				}

				const memberData = await memberResponse.json();
				console.log('Member account data:', memberData); // 응답 데이터 확인
				setMemberInfo({ account_balance: memberData.balance });
			} catch (e) {
				console.error('Error fetching member account info:', e.message); // 에러 메시지 출력
				setError(`개인 계좌 정보를 가져오는 중 문제가 발생했습니다. 상태 코드: ${e.message}`);
			}
		};

		const fetchAccountInfo = async () => {
			try {
				console.log('Fetching account info for groupId:', groupId); // groupId 확인
				const clubResponse = await fetch(`https://j11a605.p.ssafy.io/api/account/${groupId}`);
				console.log('Fetching club account info', clubResponse);

				if (!clubResponse.ok) {
					throw new Error(`HTTP error! status: ${clubResponse.status}`); // 상태 코드를 명확히 표시
				}

				const clubData = await clubResponse.json();
				console.log('Club account data:', clubData); // 응답 데이터 확인
				setAccountInfo({
					account_num: clubData.account_num,
					account_balance: clubData.account_balance,
				});
			} catch (e) {
				console.error('Error fetching club account info:', e.message); // 에러 메시지 출력
				setError(`모임 계좌 정보를 가져오는 중 문제가 발생했습니다. 상태 코드: ${e.message}`);
			}
		};

		fetchMemberInfo();
		fetchAccountInfo();
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
						<div className="transer-my-account">
							<div className="from-my-account">내 하나은행 입출금 계좌에서</div>
							<div className="transfer-balance">잔액 {memberInfo.account_balance.toString()}원</div>
						</div>

						<div className="transfer-group-account">
							<div className="to-group-account">가족모임 계좌로</div>
							{/* <div className="transfer-account">싸피 뱅크 {accountInfo.account_num}</div> */}
							<div className="transfer-balance">잔액 {accountInfo.account_balance.toString()}원</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default TransferInfo;
