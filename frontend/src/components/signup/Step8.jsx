import { Field, ErrorMessage } from 'formik';

const Step8 = () => {
	return (
		<div className="registration-step-container">
			<div className="registration-step-title">생일 입력</div>
			<div className="registration-step-content">
				<div className="welcome-message">
					프로필에 사용할 <br /> 생년월일을 입력해주세요.
				</div>
				<div className="input-group">
					<label
						htmlFor="birth_date"
						className="input-label"
					>
						생년월일
					</label>
					<Field
						id="birth_date"
						name="birth_date"
						placeholder="yymmdd"
						type="text"
						className="input-field"
					/>
					<ErrorMessage
						name="birth_date"
						render={(msg) => <div className="error-message">{msg}</div>}
					/>
				</div>
			</div>
		</div>
	);
};

export default Step8;
