import { Field, ErrorMessage } from 'formik';

const Step2 = () => {
	return (
		<div className="registration-step-container">
			<div className="registration-step-title">이메일 입력</div>
			<div className="registration-step-content">
				<div className="welcome-message">
					본인 인증을 위한 <br />
					이메일을 입력해주세요.
				</div>

				<div className="input-group">
					<label htmlFor="email">이메일</label>
					<Field
						id="email"
						name="email"
						placeholder="name@example.com"
						type="email"
						className="input-field"
					/>

					<ErrorMessage
						name="email"
						render={(msg) => <div className="error-message">{msg}</div>}
					/>
				</div>
			</div>
		</div>
	);
};

export default Step2;
