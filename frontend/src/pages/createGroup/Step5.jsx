import React from 'react';

const Step5 = ({
	handlePrevStep,
	handleNextStep,
	groupName,
	setGroupName,
	imagePreview,
	handleImageChange,
	fee,
	setFee,
	dueDate,
	setDueDate,
}) => {
	return (
		<div className="create-group-step">
			<h2 className="create-group-title">모임 설정</h2>
			<input
				type="text"
				placeholder="모임 이름"
				value={groupName}
				onChange={(e) => setGroupName(e.target.value)}
				className="create-group-input"
			/>
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
						'프로필 이미지 업로드'
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
			<input
				type="text"
				placeholder="회비 (예: 10000)"
				value={fee}
				onChange={(e) => setFee(e.target.value)}
				className="create-group-input"
			/>
			<input
				type="text"
				placeholder="회비 납부일"
				value={dueDate}
				onChange={(e) => setDueDate(e.target.value)}
				className="create-group-input"
			/>
			<div className="create-group-navigation-buttons">
				<button
					className="create-group-prev-btn"
					onClick={handlePrevStep}
				>
					이전
				</button>
				<button
					className="create-group-next-btn"
					onClick={handleNextStep}
				>
					완료
				</button>
			</div>
		</div>
	);
};

export default Step5;
