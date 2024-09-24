const GroupMember = ({ user, isPending, onApprove, onReject }) => {
	if (!user || !user.userName || !user.userProfile) return null; // 데이터가 없을 때 렌더링 방지
	return (
		<div className="group-info-member">
			<div className="group-info-member-details">
				<img
					src={user.userProfile || '/default-profile.png'} // 기본 프로필 이미지 처리
					alt={`${user.userName}의 프로필`}
					className="group-info-member-profile"
				/>
				<div className="group-info-member-name">{user.userName}</div>
			</div>
			{isPending && (
				<div className="group-info-member-actions">
					<button
						className="group-info-member-approve"
						// onClick={() => onApprove(user.userId)}
					>
						<img src="/info/ok.svg" />
					</button>
					<button
						className="group-info-member-reject"
						// onClick={() => onReject(user.userId)}
					>
						<img src="/info/close.svg" />
					</button>
				</div>
			)}
		</div>
	);
};

export default GroupMember;
