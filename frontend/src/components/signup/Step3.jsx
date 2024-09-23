import { Field, ErrorMessage } from 'formik';

const Step3 = () => {
	return (
		<div className="registration-step-container">
			<div className="registration-step-title">본인 확인</div>
			<div className="registration-step-content">
				<div className="welcome-message">
					메일로 발송된 <br />
					인증번호를 확인해 주세요.
				</div>

				<div className="input-group">
					<label
						htmlFor="verification_code"
						className="input-label"
					>
						인증번호
					</label>
					<div className="input-with-button">
						<Field
							id="verification_code"
							name="verification_code"
							placeholder="인증번호 입력"
							type="text"
							className="input-field"
						/>
						<button className="verify-button">인증</button>
					</div>
					<ErrorMessage
						name="verification_code"
						render={(msg) => <div className="error-message">{msg}</div>}
					/>
				</div>
			</div>
		</div>
	);
};

export default Step3;
