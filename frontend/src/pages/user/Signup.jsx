import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import '@/assets/css/user/signup.css';

import arrowleft from '@/assets/img/common/arrow-left.svg';

import Step1 from '@/components/signup/Step1';
import Step2 from '@/components/signup/Step2';
import Step3 from '@/components/signup/Step3';
import Step4 from '@/components/signup/Step4';
import Step5 from '@/components/signup/Step5';
import Step6 from '@/components/signup/Step6';
import Step7 from '@/components/signup/Step7';
import Step8 from '@/components/signup/Step8';
import AccountSetup from '@/components/signup/AccountSetup';

const validationSchemas = [
	Yup.object({
		member_name: Yup.string()
			.matches(/^[가-힣a-zA-Z]+$/, '이름은 한글 또는 영문만 입력 가능합니다.')
			.min(2, '이름은 최소 2자 이상이어야 합니다.')
			.max(18, '이름은 최대 18자 이내여야 합니다.')
			.required('이름을 입력하세요'),
	}),
	Yup.object({
		email: Yup.string().email('유효하지 않은 이메일 형식입니다.').required('이메일은 필수 입력 항목입니다.'),
	}),
	Yup.object({
		verification_code: Yup.string()
			.length(6, '인증번호가 일치하지 않습니다.')
			.required('인증번호는 필수 입력 항목입니다.'),
	}),
	Yup.object({
		password: Yup.string()
			.min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
			.matches(/[a-zA-Z]/, '비밀번호는 영문자를 포함해야 합니다.')
			.matches(/\d/, '비밀번호는 숫자를 포함해야 합니다.')
			.required('비밀번호는 필수 입력 항목입니다.'),
		confirm_pwd: Yup.string()
			.oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
			.required('비밀번호 확인은 필수 입력 항목입니다.'),
	}),
	Yup.object({
		phone_number: Yup.string()
			.matches(/^01[0|1|6|7|8|9]-?\d{3,4}-?\d{4}$/, '유효한 휴대폰 번호를 입력하세요.')
			.required('휴대폰 번호는 필수 입력 항목입니다.'),
	}),
	Yup.object({
		profile_image: Yup.mixed()
			.nullable()
			.test('fileSize', '파일 크기가 너무 큽니다.', (value) => {
				if (!value) return true; // 파일 없으면 검사하지 않음
				return value.size <= 102400; // 100KB 이하
			})
			.test('fileType', '이미지 파일만 업로드 가능합니다.', (value) => {
				if (!value) return true;
				return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
			}),
	}),
	Yup.object({
		address: Yup.string().required('주소를 입력하세요'),
	}),
	Yup.object({
		birth_date: Yup.string()
			.matches(/^\d{4}-\d{2}-\d{2}$/, '생년월일은 YYYY-MM-DD 형식으로 작성해주세요')
			.test('isValidDate', '유효하지 않은 날짜입니다.', (value) => {
				if (!value) return false;
				const [year, month, day] = value.split('-');
				const date = new Date(`${year}-${month}-${day}`);
				return !isNaN(date.getTime());
			})
			.required('생년월일은 필수 입력 항목입니다.'),
	}),
];

const Signup = () => {
	const [step, setStep] = useState(0);
	const navigate = useNavigate();
	const [userData, setUserData] = useState({});
	const [isVerified, setIsVerified] = useState(false);

	const userValues = {
		member_name: '',
		birth_date: '',
		phone_number: '',
		password: '',
		profile_image: null,
		profile_image_preview: null,
		email: '',
		address: '',
		verification_code: '',
	};

	const handleNext = (values) => {
		if (step === 2 && !isVerified) {
			alert('이메일 인증을 완료해야 합니다.');
			return;
		}
		setStep((prevStep) => prevStep + 1);
	};

	const handlePrevious = () => {
		if (step === 0) {
			navigate(-1);
		} else {
			setStep((prevStep) => prevStep - 1);
		}
	};

	const handleSubmit = (values, { setSubmitting }) => {
		if (step === 2 && !isVerified) {
			alert('이메일 인증을 완료해야 합니다.');
			setSubmitting(false);
			return;
		}

		if (step === validationSchemas.length - 1) {
			setUserData(values);
			navigate('/registeraccount', { state: { userData: values } });
		} else {
			handleNext(values);
		}
		setSubmitting(false);
	};

	return (
		<div className="signup-container">
			<Formik
				initialValues={userValues}
				validationSchema={validationSchemas[step]}
				onSubmit={handleSubmit}
			>
				{({ values, isSubmitting }) => (
					<Form className="signup-form">
						{step === 0 && <Step1 />}
						{step === 1 && <Step2 />}
						{step === 2 && <Step3 setIsVerified={setIsVerified} />}
						{step === 3 && <Step4 />}
						{step === 4 && <Step5 />}
						{step === 5 && <Step6 />}
						{step === 6 && <Step7 />}
						{step === 7 && <Step8 />}
						{step === 8 && (
							<AccountSetup
								onRegisterNow={() => navigate('/registeraccount/:userId')}
								onRegisterLater={() => navigate('/login')}
							/>
						)}
						<div className="signup-nav-button">
							<img
								src={arrowleft}
								onClick={handlePrevious}
								alt="이전"
							/>
							{step < 8 && (
								<button
									type="submit"
									disabled={isSubmitting}
								>
									{step === validationSchemas.length - 1 ? '계좌 등록하기' : '다음으로'}
								</button>
							)}
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Signup;
