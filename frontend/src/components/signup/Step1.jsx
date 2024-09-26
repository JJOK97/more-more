import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';

const Step1 = () => {
	const [field, meta] = useField('member_name');

	return (
		<div className="registration-step-container">
			<div className="registration-step-title">회원 가입</div>
			<div className="registration-step-content">
				<div className="welcome-message">
					반가워요! <span className="emoji">😊</span>
					<br />
					이름을 알려주세요.
				</div>
				<div className="input-group">
					<label
						htmlFor="member_name"
						className="input-label"
					>
						이름
					</label>
					<Field
						name="member_name"
						type="text"
						placeholder="홍길동"
						className="input-field"
					/>
					<ErrorMessage
						name="member_name"
						component="div"
						className="error-message"
					/>
					{!meta.error && <div className="input-note">이름은 수정이 불가하니 정확하게 입력해 주세요.</div>}
				</div>
			</div>
		</div>
	);
};

export default Step1;
