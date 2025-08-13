import React from 'react';

const Step3 = ({ handlePrevStep, handleNextStep, password, setPassword }) => {
	const handlePasswordInput = (value) => {
		if (password.length < 4) {
			setPassword((prev) => (prev + value).slice(0, 4));
			console.log(password);
		}
	};

	return (
		<div className="create-group-step scroll-action">
			<h2
				className="create-group-title"
				style={{ marginTop: '4rem' }}
			>
				비밀번호를 설정해주세요
			</h2>
			<div className="create-group-password-display">
				{'•'.repeat(password.length)}
				{'○'.repeat(4 - password.length)}
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
					onClick={() => setPassword(password.slice(0, -1))}
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
					disabled={password.length !== 4}
				>
					다음
				</button>
			</div>
		</div>
	);
};

export default Step3;
