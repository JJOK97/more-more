import React, { useState } from 'react';

const Step5 = ({
	handlePrevStep,
	handleNextStep,
	groupName,
	setGroupName,
	imagePreview,
	profileImage,
	handleImageChange,
	fee,
	setFee,
	intro,
	setIntro,
	password,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleComplete = async () => {
		setLoading(true);
		setError(null);

		// 테스트용: 생성한 모임 정보를 localStorage에 저장
		const newGroup = {
			clubId: Date.now(), // 임시 ID로 현재 시간 사용
			clubCode: `TEST${Date.now()}`, // 테스트용 클럽 코드
			clubName: groupName,
			clubIntro: intro,
			dues: Number(fee),
			clubImage: imagePreview || '/main/Plus circle.svg', // Group 컴포넌트에서 기대하는 속성명
			participants: [{ memberId: 'test-member-id' }], // Group 컴포넌트에서 length를 확인하는 배열
			createdDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
		};

		// 기존 테스트 모임들 가져오기
		const existingGroups = JSON.parse(localStorage.getItem('testGroups') || '[]');

		// 새 모임 추가
		existingGroups.push(newGroup);

		// localStorage에 저장
		localStorage.setItem('testGroups', JSON.stringify(existingGroups));

		setTimeout(() => {
			setLoading(false);
			handleNextStep();
		}, 1000); // 1초 로딩 시뮬레이션

		/* 실제 API 호출 코드 (테스트 후 활성화)
		try {
			const creatorId = localStorage.getItem('memberId');
			const ssafyUserKey = localStorage.getItem('userKey');

			const clubCreateRequest = {
				dues: Number(fee),
				creatorId: Number(creatorId),
				clubName: groupName,
				clubIntro: intro,
				ssafyUserKey: ssafyUserKey,
				accountPwd: password,
			};

			const formData = new FormData();
			formData.append('file', profileImage);
			formData.append(
				'clubCreateRequest',
				new Blob([JSON.stringify(clubCreateRequest)], {
					type: 'application/json',
				}),
			);

			const response = await fetch('https://j11a605.p.ssafy.io/api/club', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				const data = await response.json();
				handleNextStep();
			} else {
				throw new Error('모임 생성에 실패했습니다.');
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
		*/
	};

	return (
		<div className="create-group-step">
			<div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
				<h2
					className="create-group-title"
					style={{ marginTop: '0.5rem' }}
				>
					모임 정보 설정
				</h2>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
				<div>
					<label
						style={{
							display: 'block',
							marginBottom: '0.5rem',
							color: '#374151',
							fontWeight: '600',
							fontSize: '0.95rem',
						}}
					>
						📝 모임 이름 *
					</label>
					<input
						type="text"
						placeholder="우리들의 멋진 모임"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
						className="create-group-input"
					/>
				</div>

				<div>
					<label
						style={{
							display: 'block',
							marginBottom: '0.5rem',
							color: '#374151',
							fontWeight: '600',
							fontSize: '0.95rem',
						}}
					>
						🖼️ 모임 프로필 이미지
					</label>
					<div className="create-group-image-upload">
						<label
							htmlFor="imageUpload"
							className="create-group-image-label"
						>
							{imagePreview ? (
								<img
									src={imagePreview}
									alt="Preview"
									className="create-group-image-preview"
								/>
							) : (
								'이미지를 선택해주세요'
							)}
						</label>
						<input
							id="imageUpload"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="create-group-image-input"
							style={{ display: 'none' }}
						/>
					</div>
				</div>

				<div>
					<label
						style={{
							display: 'block',
							marginBottom: '0.5rem',
							color: '#374151',
							fontWeight: '600',
							fontSize: '0.95rem',
						}}
					>
						💰 월 회비 *
					</label>
					<input
						type="number"
						placeholder="10000"
						value={fee}
						onChange={(e) => setFee(e.target.value)}
						className="create-group-input"
						style={{ textAlign: 'right' }}
					/>
					<div
						style={{
							fontSize: '0.8rem',
							color: '#6b7280',
							marginTop: '0.25rem',
							display: 'flex',
							flexDirection: 'row-reverse',
						}}
					>
						원 (숫자만 입력해주세요)
					</div>
				</div>

				<div>
					<label
						style={{
							display: 'block',
							marginBottom: '0.5rem',
							color: '#374151',
							fontWeight: '600',
							fontSize: '0.95rem',
						}}
					>
						✨ 모임 소개
					</label>
					<textarea
						placeholder="이 모임은 어떤 모임인지 소개해주세요"
						value={intro}
						onChange={(e) => setIntro(e.target.value)}
						className="create-group-input"
						style={{
							minHeight: '80px',
							resize: 'vertical',
							fontFamily: 'Pretendard',
						}}
					/>
				</div>
			</div>
			<div className="create-group-navigation-buttons">
				<button
					className="create-group-prev-btn"
					onClick={handlePrevStep}
				>
					← 이전
				</button>
				<button
					className="create-group-next-btn"
					onClick={handleComplete}
					disabled={loading || !groupName || !fee}
				>
					{loading ? '🔄 생성 중...' : '모임 만들기'}
				</button>
			</div>
			{error && <p className="create-group-error">{error}</p>}
		</div>
	);
};

export default Step5;
