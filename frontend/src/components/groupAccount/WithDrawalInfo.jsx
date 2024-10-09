import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import back from '@/assets/img/account/back.svg';

const WithdrawalInfo = () => {
	const navigate = useNavigate();
	const { groupId } = useParams();
	const location = useLocation();
	const [accountInfo, setAccountInfo] = useState({ account_num: '', account_balance: 0 });
	const [clubName, setClubName] = useState('');
	const [error, setError] = useState(null);

	// 이전 페이지에서 전달받은 accountNumber를 location.state로 가져옴
	const accountNumber = location.state?.accountNumber || ''; // 빈 문자열로 설정

	useEffect(() => {
		const fetchAccountInfo = async () => {
			try {
				const clubResponse = await fetch(`https://j11a605.p.ssafy.io/api/account/${groupId}`);
				if (!clubResponse.ok) {
					throw new Error(`HTTP error! status: ${clubResponse.status}`);
				}
				const clubData = await clubResponse.json();
				setAccountInfo({
					account_num: clubData.account_num || '',
					account_balance: clubData.account_balance || 0,
				});
			} catch (e) {
				setError(`모임 계좌 정보를 가져오는 중 문제가 발생했습니다. 상태 코드: ${e.message}`);
				setAccountInfo({
					account_num: '',
					account_balance: 0,
				});
			}
		};

		const fetchClubName = async () => {
			try {
				const clubResponse = await fetch(`https://j11a605.p.ssafy.io/api/club/${groupId}`);
				if (!clubResponse.ok) {
					throw new Error(`HTTP error! status: ${clubResponse.status}`);
				}
				const clubData = await clubResponse.json();
				setClubName(clubData.clubName || '');
			} catch (e) {
				setError(`모임 이름을 가져오는 중 문제가 발생했습니다. 상태 코드: ${e.message}`);
				setClubName('');
			}
		};

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
							<div className="from-my-account">{clubName || '모임'} 계좌에서</div>
							<div className="transfer-balance">
								잔액 {accountInfo.account_balance.toLocaleString()}원
							</div>
						</div>
						<div className="transfer-group-account">
							{/* 여기서 accountNumber를 화면에 렌더링 */}
							<div className="to-group-account">{accountNumber || '계좌번호를 입력하세요.'}</div>
							<div className="transfer-account">{accountNumber || '계좌번호를 입력하세요'}</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default WithdrawalInfo;
