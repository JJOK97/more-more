import { Field, ErrorMessage } from 'formik';

const RegisterAccountStep2 = () => {
	return (
		<div>
			<h2>Step 2: 계좌 정보 입력</h2>
			<div>
				<label htmlFor="account_number">계좌 번호</label>
				<Field
					id="account_number"
					name="account_number"
					placeholder="계좌 번호를 입력하세요"
					type="text"
				/>
				<ErrorMessage
					name="account_number"
					component="div"
					className="error"
				/>
			</div>
		</div>
	);
};

export default RegisterAccountStep2;
