import React from 'react';

const Step4 = ({ handlePrevStep, handleNextStep, password, confirmPassword, setConfirmPassword }) => {
	const handlePasswordInput = (value) => {
		if (confirmPassword.length < 4) {
			setConfirmPassword((prev) => (prev + value).slice(0, 4));
		}
	};

	return (
		<div className="create-group-step scroll-action">
			<h2
				className="create-group-title"
				style={{ marginTop: '4rem' }}
			>
				한 번 더 입력해주세요
			</h2>
			<div className="create-group-password-display">
				{'•'.repeat(confirmPassword.length)}
				{'○'.repeat(4 - confirmPassword.length)}
			</div>
			<div className="create-group-keypad">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
					<button
						key={num}
						className="create-group-keypad-button"
						onClick={() => handlePasswordInput(num)}
					>
						{num}
					</button>
				))}
				<button
					className="create-group-keypad-button create-group-keypad-zero"
					onClick={() => handlePasswordInput(0)}
				>
					0
				</button>
				<button
					className="create-group-keypad-button create-group-keypad-backspace"
					onClick={() => setConfirmPassword(confirmPassword.slice(0, -1))}
				>
					<span className="backspace-icon"></span>
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
};

export default Step4;
