import { useState } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import { sendVerificationCode, verifyEmailCode } from '@/api/userAPI';

const Step3 = () => {
	const { values, setFieldError } = useFormikContext();
	const [isCodeSent, setIsCodeSent] = useState(false);

	console.log(import.meta.env.VITE_API_BASE_URL);

	// 인증번호 발송 함수
	const handleSendVerificationCode = async () => {
		try {
			await sendVerificationCode(values.email);
			alert('인증번호가 발송되었습니다.');
			setIsCodeSent(true);
		} catch (error) {
			console.error('인증번호 발송 실패:', error);
			setFieldError('email', '인증번호 발송에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	// 인증번호 확인 함수
	const handleVerifyEmailCode = async () => {
		try {
			await verifyEmailCode(values.email, values.verification_code);
			alert('인증이 완료되었습니다.');
		} catch (error) {
			console.error('인증 실패:', error);
			setFieldError('verification_code', '인증번호가 일치하지 않습니다.');
		}
	};

	return (
		<div className="registration-step-container">
			<div className="registration-step-title">본인 확인</div>
			<div className="registration-step-content">
				<div className="welcome-message">
					메일로 발송된 <br />
					인증번호를 확인해 주세요.
				</div>

				<div className="input-group">
					<label
						htmlFor="verification_code"
						className="input-label"
					>
						인증번호
					</label>
					<div className="input-with-button">
						<Field
							id="verification_code"
							name="verification_code"
							placeholder="인증번호 입력"
							type="text"
							className="input-field"
							disabled={!isCodeSent}
						/>
						<button
							type="button"
							className="verify-button"
							onClick={isCodeSent ? handleVerifyEmailCode : handleSendVerificationCode}
						>
							{isCodeSent ? '인증' : '발송'}
						</button>
					</div>
					<ErrorMessage
						name="verification_code"
						render={(msg) => <div className="error-message">{msg}</div>}
					/>
				</div>
			</div>
		</div>
	);
};

export default Step3;
