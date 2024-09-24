import React from 'react';
import { useFormikContext } from 'formik'; // Formik의 submitForm 메서드 사용

const AccountSetup = ({ onRegisterNow, onRegisterLater }) => {
	const { submitForm } = useFormikContext();

	const handleRegisterLater = () => {
		submitForm().then(() => {
			onRegisterLater();
		});
	};

	const handleRegisterNow = () => {
		submitForm().then(() => {
			onRegisterNow();
		});
	};

	return (
		<div className="registration-step-container">
			<div className="registration-step-title">계좌 등록</div>
			<div className="registration-step-content">
				<div className="welcome-message">계좌를 지금 등록하시겠습니까?</div>
				<div className="input-group">
					<div className="signup-nav-button">
						<button
							type="button"
							onClick={handleRegisterNow}
						>
							계좌 등록하기
						</button>
						<button
							type="button"
							onClick={handleRegisterLater}
						>
							건너뛰기
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountSetup;
