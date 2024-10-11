import React from 'react';

import finish from '@/assets/img/common/finish.svg';

const RegisterAccountStep5 = () => {
	return (
		<div className="registration-step-container">
			<div className="registration-step-title">계좌 연결 완료</div>
			<div className="registration-step-content finish-content">
				<img
					src={finish}
					alt="계좌 연결 완료"
					className="register-account-step-image"
				/>
				<div className="register-account-step-message"> 인증되었습니다! </div>
			</div>
		</div>
	);
};

export default RegisterAccountStep5;
