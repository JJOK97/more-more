import React, { useEffect } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';

const Step7 = () => {
	const { setFieldValue } = useFormikContext();

	// Daum Postcode API를 사용한 주소 검색 함수
	const handleAddressSearch = () => {
		new window.daum.Postcode({
			oncomplete: function (data) {
				// 검색 결과 데이터를 가져온 후 처리
				const fullAddress = data.address;
				setFieldValue('address', fullAddress); // Formik의 address 필드에 값을 설정
			},
		}).open();
	};

	useEffect(() => {
		// Daum API 스크립트 로드
		const script = document.createElement('script');
		script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<div className="registration-step-container">
			<div className="registration-step-title">주소 입력</div>
			<div className="registration-step-content">
				<div className="welcome-message">
					프로필에 등록할 <br />
					주소를 입력해 주세요.
				</div>
				<div className="input-group">
					<label htmlFor="address">주소</label>
					<div className="input-with-button">
						<Field
							id="address"
							name="address"
							placeholder="주소를 검색하세요"
							type="text"
							readOnly
							className="input-field"
							onClick={handleAddressSearch}
						/>
						<button
							className="verify-button"
							type="button"
							onClick={handleAddressSearch}
						>
							검색
						</button>
					</div>
					<ErrorMessage
						name="address"
						render={(msg) => <div className="error-message">{msg}</div>}
					/>
				</div>
			</div>
		</div>
	);
};

export default Step7;
