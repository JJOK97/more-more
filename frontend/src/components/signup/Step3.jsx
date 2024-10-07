import React, { useState } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import { sendVerificationCode, verifyEmailCode } from '@/api/userAPI';

const Step3 = ({ setIsVerified }) => {
	const { values, setFieldError, setFieldValue } = useFormikContext();
	const [isCodeSent, setIsCodeSent] = useState(false);
	const [verificationError, setVerificationError] = useState('');
	const [isVerificationSuccessful, setIsVerificationSuccessful] = useState(false);

	const handleSendVerificationCode = async () => {
		try {
			await sendVerificationCode(values.email);
			alert('인증번호가 발송되었습니다.');
			setIsCodeSent(true);
			setFieldValue('verification_code', '');
			setIsVerificationSuccessful(false);
			setIsVerified(false);
		} catch (error) {
			console.error('인증번호 발송 실패:', error);
			setFieldError('email', '인증번호 발송에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	const handleVerifyEmailCode = async () => {
		try {
			const result = await verifyEmailCode(values.email, values.verification_code);
			if (result.success) {
				alert(result.message);
				setIsVerificationSuccessful(true);
				setIsVerified(true);
				setVerificationError('');
			} else {
				setVerificationError(result.message);
				setIsVerificationSuccessful(false);
				setIsVerified(false);
			}
		} catch (error) {
			console.error('인증 실패:', error);
			setVerificationError('인증 과정에서 오류가 발생했습니다. 다시 시도해 주세요.');
			setIsVerificationSuccessful(false);
			setIsVerified(false);
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
							disabled={!isCodeSent || isVerificationSuccessful}
						/>
						<button
							type="button"
							className="verify-button"
							onClick={
								isCodeSent && !isVerificationSuccessful
									? handleVerifyEmailCode
									: handleSendVerificationCode
							}
							disabled={isVerificationSuccessful}
						>
							{isCodeSent && !isVerificationSuccessful ? '인증' : '발송'}
						</button>
					</div>
					<ErrorMessage
						name="verification_code"
						component="div"
						className="error-message"
					/>
					{verificationError && <div className="error-message">{verificationError}</div>}
					{isVerificationSuccessful && <div className="success-message">인증이 완료되었습니다.</div>}
				</div>
			</div>
		</div>
	);
};

export default Step3;
