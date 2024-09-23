import { Field, ErrorMessage } from 'formik';

const Step2 = () => {
	return (
		<div>
			<h2>Step 2: 이메일 입력</h2>
			<div>
				<label htmlFor="email">이메일</label>
				<Field
					id="email"
					name="email"
					placeholder="example@example.com"
					type="email"
				/>
				<ErrorMessage
					name="email"
					component="div"
					className="error"
				/>
			</div>
		</div>
	);
};

export default Step2;
