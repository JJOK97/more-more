import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import RegisterAccountStep1 from '@/components/register/AccountStep1';
import RegisterAccountStep2 from '@/components/register/AccountStep2';
import RegisterAccountStep3 from '@/components/register/AccountStep3';

const validationSchemas = [
	Yup.object({
		bank: Yup.string().required('은행을 선택하세요'),
	}),
	Yup.object({
		account_number: Yup.string()
			.matches(/^\d+$/, '계좌 번호는 숫자만 포함해야 합니다.')
			.required('계좌 번호는 필수 입력 항목입니다.'),
	}),
	Yup.object({
		name: Yup.string().required('이름은 필수 입력 항목입니다.'),
		phone_number: Yup.string()
			.matches(/^01[0-9]-\d{3,4}-\d{4}$/, '유효한 휴대폰 번호를 입력하세요.')
			.required('휴대폰 번호는 필수 입력 항목입니다.'),
	}),
];

const RegisterAccount = () => {
	const [step, setStep] = useState(0);

	const userValues = {
		bank: '',
		account_number: '',
		name: '',
		phone_number: '',
	};

	const handleNext = () => setStep((prevStep) => prevStep + 1);
	const handlePrevious = () => setStep((prevStep) => prevStep - 1);

	return (
		<div>
			<Formik
				initialValues={userValues}
				validationSchema={validationSchemas[step]}
				onSubmit={(values) => {
					if (step === validationSchemas.length - 1) {
						console.log('Form Data:', values); // 최종 제출
					} else {
						handleNext();
					}
				}}
			>
				{({ values }) => (
					<Form>
						{step === 0 && <RegisterAccountStep1 />}
						{step === 1 && <RegisterAccountStep2 />}
						{step === 2 && <RegisterAccountStep3 />}

						<div className="nav-buttons">
							{step > 0 && (
								<button
									type="button"
									onClick={handlePrevious}
								>
									이전
								</button>
							)}
							<button type="submit">{step === validationSchemas.length - 1 ? '완료' : '다음'}</button>
						</div>
						<pre>{JSON.stringify(values, null, 2)}</pre>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RegisterAccount;
