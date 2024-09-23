import { Field, ErrorMessage } from 'formik';

const Step2 = () => {
	return (
		<div>
			<h2>Step 2: 생년월일 입력</h2>
			<div>
				<label htmlFor="birth_date">생년월일</label>
				<Field
					id="birth_date"
					name="birth_date"
					placeholder="yymmdd"
					type="text"
				/>
				<ErrorMessage
					name="birth_date"
					component="div"
					className="error"
				/>
			</div>
		</div>
	);
};

export default Step2;
