import { ErrorMessage, Field } from 'formik';

const Step1 = () => (
	<div>
		<label>이름</label>
		<Field
			name="member_name"
			type="text"
		/>
		<ErrorMessage
			name="member_name"
			component="div"
			className="error"
		/>
	</div>
);

export default Step1;
