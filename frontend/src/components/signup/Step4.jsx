import { Field, ErrorMessage } from 'formik';

const Step4 = () => {
	return (
		<div>
			<h2>Step 4: 비밀번호 입력</h2>
			<div>
				<label htmlFor="pwd">비밀번호</label>
				<Field
					id="pwd"
					name="pwd"
					placeholder="비밀번호 입력"
					type="password"
				/>
				<ErrorMessage
					name="pwd"
					component="div"
					className="error"
				/>
			</div>

			<div>
				<label htmlFor="confirm_pwd">비밀번호 확인</label>
				<Field
					id="confirm_pwd"
					name="confirm_pwd"
					placeholder="비밀번호 확인"
					type="password"
				/>
				<ErrorMessage
					name="confirm_pwd"
					component="div"
					className="error"
				/>
			</div>
		</div>
	);
};

export default Step4;
