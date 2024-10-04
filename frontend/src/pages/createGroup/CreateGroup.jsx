import React, { useState, useEffect } from 'react';
import './CreateGroup.css';
import usePageName from '../../store/usePageName';
import { Link } from 'react-router-dom';

const CreateGroup = () => {
	const [step, setStep] = useState(1);
	const [groupName, setGroupName] = useState('');
	const [profileImage, setProfileImage] = useState(null);
	const [imagePreview, setImagePreview] = useState('');
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [fee, setFee] = useState('');
	const [dueDate, setDueDate] = useState('');
	const { setPageName } = usePageName();

	useEffect(() => {
		setPageName('모임 만들기');
	}, [setPageName]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setProfileImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleImageClick = () => {
		document.getElementById('imageInput').click();
	};

	const handleSubmit = (e) => {
		if (e) e.preventDefault();
		console.log('Group Name:', groupName);
		console.log('Profile Image:', profileImage);
		console.log('Fee:', fee);
		console.log('Due Date:', dueDate);
		setStep(6);
	};

	const handleNextStep = () => {
		if (step === 5) {
			handleSubmit();
		} else {
			setStep((prev) => prev + 1);
		}
	};

	const handlePrevStep = () => {
		setStep((prev) => prev - 1);
	};

	const handlePasswordInput = (value, setter) => {
		if (password.length < 4 || setter === setConfirmPassword) {
			setter((prev) => (prev + value).slice(0, 4));
		}
	};

	const renderStepContent = () => {
		switch (step) {
			case 1:
				return (
					<div className="create-group-step">
						<h2 className="create-group-title">모임을 진행하기 위해서는 모임통장 개설이 필요해요.</h2>
						<div className="create-group-navigation-buttons">
							<button
								className="create-group-next-btn"
								onClick={handleNextStep}
							>
								다음
							</button>
						</div>
					</div>
				);
			case 2:
				return (
					<div className="create-group-step">
						<h2 className="create-group-title">공동명의예금 확인서</h2>
						<p className="create-group-text">내용 생략...</p>
						<label className="create-group-checkbox-container">
							<input
								type="checkbox"
								className="create-group-checkbox"
								checked={termsAccepted}
								onChange={(e) => setTermsAccepted(e.target.checked)}
							/>
							위의 내용을 전부 확인하였습니다.
						</label>
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
								disabled={!termsAccepted}
							>
								다음
							</button>
						</div>
					</div>
				);
			case 3:
				return (
					<div className="create-group-step">
						<h2 className="create-group-title">비밀번호를 설정해주세요</h2>
						<div className="create-group-password-display">
							{'•'.repeat(password.length)}
							{'○'.repeat(4 - password.length)}
						</div>
						<div className="create-group-keypad">
							{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
								<button
									key={num}
									className="create-group-keypad-button"
									onClick={() => handlePasswordInput(num, setPassword)}
								>
									{num}
								</button>
							))}
							<button
								className="create-group-keypad-button create-group-keypad-zero"
								onClick={() => handlePasswordInput(0, setPassword)}
							>
								0
							</button>
							<button
								className="create-group-keypad-button"
								onClick={() => setPassword(password.slice(0, -1))}
							>
								Backspace
							</button>
						</div>
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
								disabled={password.length !== 4}
							>
								다음
							</button>
						</div>
					</div>
				);
			case 4:
				return (
					<div className="create-group-step">
						<h2 className="create-group-title">동일한 비밀번호를 한 번 더 입력해주세요</h2>
						<div className="create-group-password-display">
							{'•'.repeat(confirmPassword.length)}
							{'○'.repeat(4 - confirmPassword.length)}
						</div>
						<div className="create-group-keypad">
							{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
								<button
									key={num}
									className="create-group-keypad-button"
									onClick={() => handlePasswordInput(num, setConfirmPassword)}
								>
									{num}
								</button>
							))}
							<button
								className="create-group-keypad-button create-group-keypad-zero"
								onClick={() => handlePasswordInput(0, setConfirmPassword)}
							>
								0
							</button>
							<button
								className="create-group-keypad-button"
								onClick={() => setConfirmPassword(confirmPassword.slice(0, -1))}
							>
								Backspace
							</button>
						</div>
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
								disabled={confirmPassword.length !== 4 || password !== confirmPassword}
							>
								다음
							</button>
						</div>
					</div>
				);
			case 5:
				return (
					<div className="create-group-step">
						<div className="create-group-name-container">
							<input
								className="create-group-name-input"
								placeholder="모임 이름 입력"
								type="text"
								value={groupName}
								onChange={(e) => setGroupName(e.target.value)}
								required
							/>
						</div>
						<div className="create-group-image-upload-container">
							<input
								type="file"
								id="imageInput"
								accept="image/*"
								onChange={handleImageChange}
								style={{ display: 'none' }}
							/>
							<div
								className="create-group-image-upload"
								onClick={handleImageClick}
							>
								{imagePreview ? (
									<img
										src={imagePreview}
										alt="Profile Preview"
										className="create-group-image-preview"
									/>
								) : (
									<span className="create-group-add-photo">모임 프로필 추가</span>
								)}
							</div>
						</div>
						<div className="create-group-fee-container">
							<input
								className="create-group-fee-input"
								type="text"
								placeholder="회비 입력"
								value={fee}
								onChange={(e) => setFee(e.target.value)}
							/>
							<input
								className="create-group-duedate-input"
								type="text"
								placeholder="회비 납부일"
								value={dueDate}
								onChange={(e) => setDueDate(e.target.value)}
							/>
						</div>
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
								disabled={!groupName || !fee || !dueDate}
							>
								다음
							</button>
						</div>
					</div>
				);
			case 6:
				return (
					<div className="create-group-step">
						<h2 className="create-group-title">모임을 만들었습니다!</h2>
						<p className="create-group-text">계좌번호: 123-456-789</p>
						<p className="create-group-text">모임 이름: {groupName}</p>
						<Link
							to={'/'}
							className="create-group-home-link"
						>
							<button className="create-group-home-btn">홈으로 이동</button>
						</Link>
					</div>
				);
			default:
				return null;
		}
	};

	return <div className="create-group">{renderStepContent()}</div>;
};

export default CreateGroup;
