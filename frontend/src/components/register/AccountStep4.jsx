import { Field, ErrorMessage, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

const RegisterAccountStep4 = ({ setStep }) => {
	const { values, setFieldValue, resetForm, errors, touched } = useFormikContext(); // values를 가져옴
	const [marginBottom, setMarginBottom] = useState('4rem'); // margin-bottom 상태 초기화

	// 에러가 있을 때 margin-bottom을 0으로 설정하고, 없을 때는 4rem으로 설정
	useEffect(() => {
		if (errors.verification_code && touched.verification_code) {
			setMarginBottom('0');
		} else {
			setMarginBottom('4rem');
		}
	}, [errors.verification_code, touched.verification_code]); // errors와 touched가 변경될 때마다 실행

	// 입력값 처리
	const handleChange = (value, index) => {
		if (!isNaN(value)) {
			// 숫자인지 확인
			const newCode = [...(values.verification_code || '')];
			newCode[index] = value.slice(0, 1); // 한 글자만 입력되도록 설정
			setFieldValue('verification_code', newCode.join('')); // Formik 필드 값 업데이트

			if (value && index < 3) {
				document.getElementById(`code-${index + 1}`).focus(); // 다음 입력 필드로 포커스 이동
			}
		}
	};

	// 변경하기 버튼을 눌렀을 때 나머지 데이터 초기화
	const handleAccountChange = () => {
		resetForm({
			values: {
				...values,
				bank: '', // 은행 정보 비우기
				bankLabel: '', // 은행 이름 비우기
				bankIcon: '', // 은행 아이콘 비우기
				account_number: '', // 계좌 번호 비우기
				// Step 3의 데이터 유지 (예: name, phone_number)
				// verification_code는 자동으로 초기화되므로 따로 지울 필요 없음
			},
		});
		setStep(0); // Step 1로 돌아가기
	};

	return (
		<div className="registration-step-container">
			<div className="registration-step-title">계좌 인증</div>
			<div className="registration-step-content verification-container">
				<div className="welcome-message verification">
					등록하신 계좌로 1원을 보냈습니다. <br />
					계좌의 입금내역에 표시된 <br /> 4자리 글자를 입력해주세요.
				</div>

				{/* margin-bottom을 상태에 따라 동적으로 설정 */}
				<div
					className="code-input-group"
					style={{ marginBottom }}
				>
					{/* 4자리 인증번호 입력 필드 */}
					{['', '', '', ''].map((_, index) => (
						<Field
							key={index}
							id={`code-${index}`}
							name={`verification_code_${index}`}
							type="text"
							className="code-input-box"
							maxLength="1"
							onChange={(e) => handleChange(e.target.value, index)}
						/>
					))}
				</div>

				{/* 인증번호 관련 에러 메시지 표시 */}
				<ErrorMessage
					name="verification_code"
					component="div"
					className="error-message verification-error"
				/>

				<div className="account-info">
					<div className="bank-info">
						<img
							src={values.bankIcon}
							alt={values.bank}
							className="bank-icon"
						/>
						<span>
							{values.bankLabel} {values.account_number}
						</span>
					</div>
					<button
						type="button"
						className="change-account-btn"
						onClick={handleAccountChange} // 계좌 정보 초기화 및 Step 1로 이동
					>
						변경하기
					</button>
				</div>

				<div className="note">* 입금내역이 없다면 등록하신 계좌 정보를 다시 확인해주세요.</div>
			</div>
		</div>
	);
};

export default RegisterAccountStep4;
