import { Field, ErrorMessage } from 'formik';

const Step3 = () => {
	return (
		<div>
			<h2>Step 3: 이메일 인증번호 입력</h2>
			<div>
				<label htmlFor="verification_code">인증번호</label>
				<Field
					id="verification_code"
					name="verification_code"
					placeholder="인증번호 입력"
					type="text"
				/>
				<ErrorMessage
					name="verification_code"
					component="div"
					className="error"
				/>
			</div>
		</div>
	);
};

export default Step3;
