import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerMember } from '@/api/userAPI';

import '@/assets/css/registerAccount/Account.css';

import arrowleft from '@/assets/img/common/arrow-left.svg';

import RegisterAccountStep1 from '@/components/register/AccountStep1';
import RegisterAccountStep2 from '@/components/register/AccountStep2';
import RegisterAccountStep3 from '@/components/register/AccountStep3';
import RegisterAccountStep4 from '@/components/register/AccountStep4';
import RegisterAccountStep5 from '@/components/register/AccountStep5';

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
		member_name: Yup.string().required('이름은 필수 입력 항목입니다.'),
		phone_number: Yup.string()
			.matches(/^01[0|1|6|7|8|9]-?\d{3,4}-?\d{4}$/, '유효한 휴대폰 번호를 입력하세요.')
			.required('휴대폰 번호는 필수 입력 항목입니다.'),
	}),
	Yup.object({
		verification_code: Yup.string()
			.matches(/^\d{4}$/, '인증번호는 4자리 숫자로 입력해야 합니다.')
			.required('인증번호는 필수 입력 항목입니다.'),
	}),
];

const RegisterAccount = () => {
	const [step, setStep] = useState(0);
	const location = useLocation();
	const navigate = useNavigate();
	const userData = location.state?.userData || {};

	const initialValues = {
		...userData,
		bank: '',
		account_number: '',
		member_name: userData.member_name || '',
		verification_code: '',
	};

	const handlePrevious = () => {
		if (step === 0) {
			if (location.state?.from) {
				// location.state에 저장된 이전 경로가 있을 경우
				navigate(location.state.from);
			} else {
				// 이전 경로가 없다면 기본적으로 브라우저 이전 페이지로 이동
				navigate(-1);
			}
		} else {
			setStep((prevStep) => prevStep - 1);
		}
	};

	const handleSubmit = async (values, { setSubmitting }) => {
		if (step < validationSchemas.length - 1) {
			setStep((prevStep) => prevStep + 1);
		} else {
			try {
				const formData = new FormData();
				formData.append('accountNumber', values.account_number || '');
				formData.append('address', values.address || '');
				formData.append('email', values.email || '');
				formData.append('phoneNumber', values.phone_number || '');
				formData.append('password', values.pwd || '');
				formData.append('birthDate', values.birth_date || '');
				formData.append('name', values.member_name || '');

				if (values.profile_image) {
					formData.append('profileImage', values.profile_image);
				}

				console.log('Sending data:', Object.fromEntries(formData));
				const response = await registerMember(formData);
				console.log('회원가입 성공:', response);
				navigate('/login');
			} catch (error) {
				console.error('회원가입 실패:', error);
			}
		}
		setSubmitting(false);
	};

	return (
		<div className="signup-container">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchemas[step]}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form className="signup-form">
						{step === 0 && <RegisterAccountStep1 />}
						{step === 1 && <RegisterAccountStep2 />}
						{step === 2 && <RegisterAccountStep3 />}
						{step === 3 && <RegisterAccountStep4 setStep={setStep} />}
						{step === 4 && <RegisterAccountStep5 />}

						<div className="signup-nav-button">
							<img
								src={arrowleft}
								onClick={handlePrevious}
								alt="Previous"
							/>
							<button
								type="submit"
								disabled={isSubmitting}
							>
								{step === validationSchemas.length - 1 ? '로그인하러 가기' : '다음으로'}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RegisterAccount;
