import { Field, ErrorMessage } from 'formik';

const Step5 = () => {
	return (
		<div>
			<h2>Step 5: 휴대폰 번호 입력</h2>
			<div>
				<label htmlFor="phone_number">휴대폰 번호</label>
				<Field
					id="phone_number"
					name="phone_number"
					placeholder="010-1234-5678"
					type="text"
				/>
				<ErrorMessage
					name="phone_number"
					component="div"
					className="error"
				/>
			</div>
		</div>
	);
};

export default Step5;
