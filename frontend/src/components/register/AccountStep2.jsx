import { Field, ErrorMessage, useField } from 'formik';

const RegisterAccountStep2 = () => {
	const [field, meta] = useField('account_number');

	return (
		<div className="registration-step-container">
			<div className="registration-step-title">계좌 연결</div>
			<div className="registration-step-content">
				<div className="welcome-message">
					주로 사용하실 <br />
					계좌 번호를 입력해주세요.
				</div>
				<div className="input-group">
					<label
						htmlFor="account_number"
						className="input-label"
					>
						계좌 번호
					</label>
					<Field
						id="account_number"
						name="account_number"
						placeholder="계좌 번호를 입력하세요"
						type="text"
						className="input-field"
					/>
					<ErrorMessage
						name="account_number"
						component="div"
						className="error-message"
					/>
					{!meta.error && <div className="input-note">'-'없이 숫자만 입력해주세요.</div>}
				</div>
			</div>
		</div>
	);
};

export default RegisterAccountStep2;
