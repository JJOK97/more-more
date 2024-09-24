import { Field, ErrorMessage } from 'formik';

const RegisterAccountStep3 = () => {
	return (
		<div>
			<h2>Step 3: 본인 확인</h2>
			<div>
				<label htmlFor="name">이름</label>
				<Field
					id="name"
					name="name"
					placeholder="이름을 입력하세요"
					type="text"
				/>
				<ErrorMessage
					name="name"
					component="div"
					className="error"
				/>

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

export default RegisterAccountStep3;
