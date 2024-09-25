import { FastField, useField, ErrorMessage } from 'formik';

const RegisterAccountStep3 = () => {
	// phone_number 필드에 대해 useField 사용
	const [, meta] = useField('phone_number');

	return (
		<div className="registration-step-container">
			<div className="registration-step-title">본인 확인</div>
			<div className="registration-step-content">
				<div className="welcome-message">본인 확인을 위한 개인 정보를 입력해주세요.</div>
				<div className="input-group">
					{/* 이름 필드 */}
					<label htmlFor="name">이름</label>
					<FastField
						id="name"
						name="name"
						placeholder="이름을 입력하세요"
						type="text"
						className="input-field"
					/>
					<ErrorMessage
						name="name"
						component="div"
						className="error-message"
					/>

					<br />

					{/* 휴대폰 번호 필드 */}
					<label htmlFor="phone_number">휴대폰 번호</label>
					<FastField
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

					{!meta.error && meta.touched && <div className="input-note">'-' 없이 숫자만 입력해주세요.</div>}
				</div>
			</div>
		</div>
	);
};

export default RegisterAccountStep3;
