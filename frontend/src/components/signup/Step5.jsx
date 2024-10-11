import React from 'react';
import { Field, ErrorMessage, useField } from 'formik';

const Step5 = () => {
	const [field, meta] = useField('phone_number');

	return (
		<div className="registration-step-container">
			<div className="registration-step-title">연락처 등록</div>
			<div className="registration-step-content">
				<div className="welcome-message">
					연락처 연동을 위한 <br />
					휴대폰 번호를 입력해주세요.
				</div>

				<div className="input-group">
					<label htmlFor="phone_number">휴대폰 번호</label>
					<Field
						id="phone_number"
						name="phone_number"
						placeholder="01012345678"
						type="text"
						className="input-field"
					/>
					<ErrorMessage
						name="phone_number"
						component="div"
						className="error-message"
					/>
					{!meta.error && <div className="input-note">'-'없이 숫자만 입력해주세요.</div>}
				</div>
			</div>
		</div>
	);
};

export default Step5;
