import '@/assets/css/groupInfo/GroupInfo.css';
import React, { useEffect, useState } from 'react';
import GroupMember from './GroupMember.jsx';
import InviteModal from './InviteModal';
import useGroupName from '@/store/useGroupName';
import { useParams } from 'react-router-dom';
import { getDatas } from '../feed/getData';

const GroupInfo = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출
	const [isInfoOpen, setIsInfoOpen] = useState(true);
	const [isMembersOpen, setIsMembersOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [groupInfo, setGroupInfo] = useState(null); // 그룹 정보를 저장할 상태
	const [profileImage, setProfileImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// 그룹 정보를 불러오는 useEffect
	useEffect(() => {
		const getGroupInfo = async () => {
			try {
				const url = `https://j11a605.p.ssafy.io/api/club/${groupId}`;
				const data = await getDatas(url);
				console.log(data);
				setGroupInfo(data); // 가져온 데이터를 상태에 저장
				setProfileImage(data.clubImage); // 기본 이미지를 설정
			} catch (error) {
				console.error('Error fetching group info:', error);
			}
		};
		getGroupInfo();
	}, [groupId]);

	// groupInfo가 업데이트될 때, groupName 상태를 업데이트
	useEffect(() => {
		if (groupInfo && groupInfo.clubName) {
			setGroupName(groupInfo.clubName);
		}
	}, [groupInfo, setGroupName]);

	const toggleInfo = () => setIsInfoOpen(!isInfoOpen);
	const toggleMembers = () => setIsMembersOpen(!isMembersOpen);

	// 모임 이름과 한 줄 소개 저장을 위한 함수
	// 모임 이름과 한 줄 소개 저장을 위한 함수
	const handleSaveGroupInfo = async () => {
		try {
			const url = `https://j11a605.p.ssafy.io/api/club/${groupId}`;

			// 기존 값에서 필요한 데이터 추출
			const { clubId, dues, clubCode, clubName, clubIntro } = groupInfo;

			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					clubId: clubId, // 기존 clubId 유지
					dues: dues, // 기존 dues 유지
					clubCode: clubCode, // 기존 clubCode 유지
					clubName: clubName, // 수정된 clubName 값
					// clubIntro: clubIntro, // clubIntro 포함
				}),
			});

			if (response.ok) {
				const updatedData = await response.json();
				console.log('Group info updated successfully:', updatedData);
				setGroupInfo(updatedData); // 서버에서 반환한 업데이트된 데이터를 상태에 저장
				setIsEditing(false); // 편집 모드를 비활성화
			} else {
				console.error('Failed to update group info');
			}
		} catch (error) {
			console.error('Error updating group info:', error);
		}
	};

	// 편집 버튼 토글 핸들러 수정
	const handleEditToggle = () => {
		if (isEditing) {
			handleSaveGroupInfo(); // 편집 모드에서 저장할 때 API 호출
		} else {
			setIsEditing(true); // 편집 모드로 전환
		}
	};

	// 프로필 이미지를 변경할 때 호출되는 함수
	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setProfileImage(imageUrl); // 새 이미지를 미리보기로 설정

			// 서버에 이미지 업로드
			const formData = new FormData();
			formData.append('file', file);

			try {
				const response = await fetch(`https://j11a605.p.ssafy.io/api/club/${groupId}/image`, {
					method: 'POST',
					body: formData,
				});
				if (response.ok) {
					const updatedData = await response.json();
					console.log('Image uploaded successfully:', updatedData);
					// 업로드 성공 후 추가적인 처리가 필요하다면 여기서 진행
				} else {
					console.error('Failed to upload image');
				}
			} catch (error) {
				console.error('Error uploading image:', error);
			}
		}
	};

	// ACCEPTED 상태의 멤버 수 계산
	const acceptedMembers = groupInfo?.participants?.filter((user) => user.acceptanceStatus === 'ACCEPTED');

	// WAITING 상태의 멤버 리스트 구분
	const waitingMembers = groupInfo?.participants?.filter((user) => user.acceptanceStatus === 'WAITING');

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

				{isInfoOpen && groupInfo && (
					<div className="group-info-body">
						<div className="group-info-name">
							<div className="group-info-name-value">
								<div className="group-info-name-label">그룹명 :</div>
								{isEditing ? (
									<input
										type="text"
										value={groupInfo.clubName}
										onChange={(e) => setGroupInfo({ ...groupInfo, clubName: e.target.value })}
										className="group-info-name-input"
									/>
								) : (
									<div className="group-info-name-text">{groupInfo.clubName}</div>
								)}
							</div>
						</div>
						<div className="group-info-intro">
							<div className="group-info-intro-value">
								<div className="group-info-intro-label">한 줄 소개 :</div>
								{isEditing ? (
									<input
										type="text"
										value={groupInfo.clubIntro}
										onChange={(e) => setGroupInfo({ ...groupInfo, clubIntro: e.target.value })}
										className="group-info-intro-input"
									/>
								) : (
									<div className="group-info-intro-text">{groupInfo.clubIntro}</div>
								)}
							</div>
						</div>
						<div className="group-info-start-date">
							<div className="group-info-start-date-value">
								<div className="group-info-start-date-label">개설일 :</div>
								<div className="group-info-start-date-text">{groupInfo.createdDate}</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="group-info-members">
				<div className="group-info-members-header">
					<div className="group-info-members-info">
						<div className="group-info-members-label">모임원</div>
						<div className="group-info-members-count">{acceptedMembers?.length}명</div>{' '}
						{/* ACCEPTED 멤버 수 */}
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
						{/* ACCEPTED 멤버 */}
						<h3>모임원 목록</h3>
						{acceptedMembers.length > 0 ? (
							acceptedMembers.map((user) => (
								<GroupMember
									key={user.userId}
									userId={user.userId}
									status={user.acceptanceStatus}
								/>
							))
						) : (
							<div>모임원이 없습니다.</div>
						)}

						{/* WAITING 멤버 */}
						{waitingMembers?.length > 0 && (
							<>
								<h3>가입 대기</h3>
								{waitingMembers.map((user) => (
									<GroupMember
										key={user.userId}
										userId={user.userId}
										status={user.acceptanceStatus}
									/>
								))}
							</>
						)}
					</div>
				)}
			</div>
			{isModalOpen && (
				<InviteModal
					onClose={closeModal}
					groupId={groupId}
				/>
			)}
		</div>
	);
};

export default GroupInfo;
