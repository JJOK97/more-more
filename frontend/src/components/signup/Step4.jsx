import React from 'react';
import { Field, ErrorMessage, useField } from 'formik';

const Step4 = () => {
	const [pwdField, pwdMeta] = useField('pwd');
	const [confirmPwdField, confirmPwdMeta] = useField('confirm_pwd');

	return (
		<div className="registration-step-container">
			<div className="registration-step-title">비밀번호 입력</div>
			<div className="registration-step-content">
				<div className="welcome-message">비밀번호를 입력해주세요.</div>
				<div className="input-group">
					<label htmlFor="pwd">비밀번호</label>
					<Field
						id="pwd"
						name="pwd"
						placeholder="비밀번호 입력"
						type="password"
						className="input-field"
					/>
					<ErrorMessage
						name="pwd"
						component="div"
						className="error-message"
					/>
					{!pwdMeta.error && (
						<div className="input-note">영문 대소문자, 숫자 포함 8자리 이상 입력해주세요.</div>
					)}

					<br />

					<label htmlFor="confirm_pwd">비밀번호 확인</label>
					<Field
						id="confirm_pwd"
						name="confirm_pwd"
						placeholder="비밀번호 확인"
						type="password"
						className="input-field"
					/>
					<ErrorMessage
						name="confirm_pwd"
						component="div"
						className="error-message"
					/>
				</div>
			</div>
		</div>
	);
};

export default Step4;
