import { useEffect, useState } from 'react';

const GroupMember = ({ userId, status, groupId, participantId }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// API 호출로 사용자 정보 가져오기
		const fetchUserData = async () => {
			try {
				const response = await fetch(`https://j11a605.p.ssafy.io/api/member/${userId}`, {
					method: 'GET',
				});
				const data = await response.json();
				console.log(data);
				console.log(status);
				setUser(data);
			} catch (error) {
				console.error('Error fetching user data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, [userId]);

	const handleApprove = async () => {
		try {
			const response = await fetch(`https://j11a605.p.ssafy.io/api/club/${groupId}/accept/${participantId}`, {
				method: 'PUT',
			});
			const data = await response.json();
			console.log(data);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleReject = async () => {
		try {
			const response = await fetch(`https://j11a605.p.ssafy.io/api/club/${groupId}/reject/${participantId}`, {
				method: 'DELETE',
			});
			const data = await response.json();
			console.log(data);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) return <div>Loading...</div>; // 로딩 중일 때 표시

	if (!user) return null; // 데이터가 없을 때 렌더링 방지

	return (
		<div className="group-info-member">
			<div className="group-info-member-details">
				<img
					src={user.profileImageUrl || '/default-profile.png'} // 기본 프로필 이미지 처리
					alt={`${user.name}의 프로필`}
					className="group-info-member-profile"
				/>
				<div className="group-info-member-name">{user.name}</div>
			</div>
			{status == 'WAITING' && (
				<div className="group-info-member-actions">
					<button className="group-info-member-approve">
						<img
							src="/info/ok.svg"
							alt="Approve"
							onClick={handleApprove}
						/>
					</button>
					<button className="group-info-member-reject">
						<img
							src="/info/close.svg"
							alt="Reject"
							onClick={handleReject}
						/>
					</button>
				</div>
			)}
		</div>
	);
};

export default GroupMember;
