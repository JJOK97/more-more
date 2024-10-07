import '@/assets/css/groupInfo/GroupInfo.css';
import React, { useState } from 'react';
import data from './data.json';
import GroupMember from '@/components/groupInfo/GroupMember.jsx';
import InviteModal from './InviteModal';

const GroupInfo = () => {
	const [isInfoOpen, setIsInfoOpen] = useState(true);
	const [isMembersOpen, setIsMembersOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [groupName, setGroupName] = useState('옥냥이네 가족');
	const [intro, setIntro] = useState('행복한 하루@...');
	const [profileImage, setProfileImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleInfo = () => setIsInfoOpen(!isInfoOpen);
	const toggleMembers = () => setIsMembersOpen(!isMembersOpen);
	const handleEditToggle = () => setIsEditing(!isEditing);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setProfileImage(imageUrl);
		}
	};

	const openModal = () => setIsModalOpen(true); // 모달 열기
	const closeModal = () => setIsModalOpen(false); // 모달 닫기

	return (
		<div className="group-info-container">
			<div className="group-info-profile-picture-container">
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
					<div className="group-info-header-actions">
						{isInfoOpen && (
							<button
								className="group-info-edit-button"
								onClick={handleEditToggle}
							>
								{isEditing ? '저장' : '편집'}
							</button>
						)}
						<button
							className="group-info-toggle-button"
							onClick={toggleInfo}
						>
							{isInfoOpen ? <img src="/info/chevron-up.svg" /> : <img src="/info/chevron-down.svg" />}
						</button>
					</div>
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
						<div className="group-info-start-date">
							<div className="group-info-start-date-value">
								<div className="group-info-start-date-label">개설일 :</div>
								<div className="group-info-start-date-text">2024-09-09</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="group-info-members">
				<div className="group-info-members-header">
					<div className="group-info-members-info">
						<div className="group-info-members-label">모임원</div>
						<div className="group-info-members-count">{data.users.length}명</div>
					</div>
					<div className="group-info-members-actions">
						{isMembersOpen && (
							<button
								className="group-info-invite-button"
								onClick={openModal}
							>
								멤버 초대
							</button>
						)}
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
						{/* 일반 멤버 */}
						{data.users && data.users.length > 0 ? (
							data.users.map((user) => (
								<GroupMember
									key={user.userId}
									user={user}
								/>
							))
						) : (
							<div>모임원이 없습니다.</div>
						)}

						{/* 펜딩 멤버 */}
						{data.pendings && data.pendings.length > 0 ? (
							<div className="group-info-pending-invites">
								<div className="group-info-pending-label">수락 대기</div>
								{data.pendings.map((pending) => (
									<GroupMember
										key={pending.userId}
										user={pending}
										isPending={true}
										// onApprove={handleApprove}
										// onReject={handleReject}
									/>
								))}
							</div>
						) : (
							<div>수락 대기 중인 멤버가 없습니다.</div>
						)}
					</div>
				)}
			</div>
			{isModalOpen && <InviteModal onClose={closeModal} />}
		</div>
	);
};

export default GroupInfo;
