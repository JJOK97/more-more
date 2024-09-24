import '@/assets/css/groupInfo/GroupInfo.css'; // CSS 파일 분리
import React, { useState } from 'react';
import data from './data.json';

const GroupInfo = () => {
	const [isInfoOpen, setIsInfoOpen] = useState(true);
	const [isMembersOpen, setIsMembersOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false); // 그룹명과 한 줄 소개를 동시에 수정할 수 있게 함
	const [groupName, setGroupName] = useState('옥냥이네 가족');
	const [intro, setIntro] = useState('행복한 하루@...');
	const [profileImage, setProfileImage] = useState(null); // 프로필 사진 상태

	const toggleInfo = () => setIsInfoOpen(!isInfoOpen);
	const toggleMembers = () => setIsMembersOpen(!isMembersOpen);

	const handleEditToggle = () => setIsEditing(!isEditing); // 편집 모드 토글

	// 이미지 파일 업로드 핸들러
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file); // 이미지 URL 생성
			setProfileImage(imageUrl); // 상태 업데이트
		}
	};

	return (
		<div className="group-info-container">
			<div className="group-info-profile-picture-container">
				{/* 이미지 미리 보기 또는 기본 이미지 */}
				<label
					htmlFor="profile-upload"
					className="group-info-profile-picture-label"
				>
					{profileImage ? (
						<img
							src={profileImage}
							alt="Profile"
							className="group-info-profile-picture"
						/>
					) : (
						<div className="group-info-profile-placeholder">모임 프로필 이미지가 없습니다.</div>
					)}
				</label>
				<input
					id="profile-upload"
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="group-info-profile-input"
				/>
			</div>

			<div className="group-info-details">
				<div className="group-info-header">
					<div className="group-info-header-info">모임 정보</div>
					<button
						className="group-info-toggle-button"
						onClick={toggleInfo}
					>
						{isInfoOpen ? <img src="/info/chevron-up.svg" /> : <img src="/info/chevron-down.svg" />}
					</button>
				</div>
				{isInfoOpen && (
					<div className="group-info-body">
						<div className="group-info-name">
							<div className="group-info-name-value">
								<div className="group-info-name-label">그룹명 :</div>
								{isEditing ? (
									<input
										type="text"
										value={groupName}
										onChange={(e) => setGroupName(e.target.value)}
										className="group-info-name-input"
									/>
								) : (
									<div className="group-info-name-text">{groupName}</div>
								)}
							</div>
							<button
								className="group-info-edit-button"
								onClick={handleEditToggle}
							>
								{isEditing ? '저장' : '편집'}
							</button>
						</div>
						<div className="group-info-start-date">
							<div className="group-info-start-date-value">
								<div className="group-info-start-date-label">개설일 :</div>
								<div className="group-info-start-date-text">2024-09-09</div>
							</div>
						</div>
						<div className="group-info-intro">
							<div className="group-info-intro-value">
								<div className="group-info-intro-label">한 줄 소개 :</div>
								{isEditing ? (
									<input
										type="text"
										value={intro}
										onChange={(e) => setIntro(e.target.value)}
										className="group-info-intro-input"
									/>
								) : (
									<div className="group-info-intro-text">{intro}</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>

			{/* 모임원 섹션 */}
			<div className="group-info-members">
				<div className="group-info-members-header">
					<div className="group-info-members-info">
						<div className="group-info-members-label">모임원</div>
						<div className="group-info-members-count">{data.users.length}명</div>
					</div>
					<div className="group-info-members-actions">
						{isMembersOpen && <button className="group-info-invite-button">멤버 초대</button>}
						<button
							className="group-info-toggle-button"
							onClick={toggleMembers}
						>
							{isMembersOpen ? <img src="/info/chevron-up.svg" /> : <img src="/info/chevron-down.svg" />}
						</button>
					</div>
				</div>

				{isMembersOpen && (
					<div className="group-info-members-list">
						{/* Users 목록 */}
						{data.users.map((user) => (
							<div
								key={user.userId}
								className="group-info-member"
							>
								<img
									src={user.userProfile}
									alt={`${user.userName}의 프로필`}
									className="group-info-member-profile"
								/>
								<div className="group-info-member-name">{user.userName}</div>
							</div>
						))}

						{/* 수락 대기 목록 */}
						<div className="group-info-pending-invites">
							<div className="group-info-pending-label">수락 대기</div>
							{data.pendings.map((pending) => (
								<div
									key={pending.userId}
									className="group-info-member"
								>
									<img
										src={pending.userProfile}
										alt={`${pending.userName}의 프로필`}
										className="group-info-member-profile"
									/>
									<div className="group-info-member-name">{pending.userName}</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default GroupInfo;
