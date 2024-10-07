import React from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';

const RegisterAccountStep3 = () => {
	const { values, setFieldValue } = useFormikContext();

	console.log('Current values in AccountStep3:', values); // 디버깅용 로그

	return (
		<div className="registration-step-container">
			<div className="registration-step-title">본인 확인</div>
			<div className="registration-step-content">
				<div className="welcome-message">본인 확인을 위한 개인 정보를 입력해주세요.</div>
				<div className="input-group">
					<label htmlFor="member_name">이름</label>
					<Field
						id="member_name"
						name="member_name"
						placeholder="이름을 입력하세요"
						type="text"
						className="input-field"
					/>
					<ErrorMessage
						name="member_name"
						component="div"
						className="error-message"
					/>

					<label htmlFor="phone_number">휴대폰 번호</label>
					<Field
						id="phone_number"
						name="phone_number"
						placeholder="010-1234-5678"
						type="text"
						className="input-field"
					/>
					<ErrorMessage
						name="phone_number"
						component="div"
						className="error-message"
					/>

					<div className="input-note">'-' 없이 숫자만 입력해주세요.</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterAccountStep3;
