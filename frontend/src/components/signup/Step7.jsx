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
		<div>
			<h2>Step 7: 주소 입력</h2>
			<div>
				<label htmlFor="address">주소</label>
				<Field
					id="address"
					name="address"
					placeholder="주소를 검색하세요"
					type="text"
					readOnly // 사용자가 직접 입력하지 않고 검색 결과로만 입력
				/>
				<ErrorMessage
					name="address"
					component="div"
					className="error"
				/>
				<button
					type="button"
					onClick={handleAddressSearch}
				>
					주소 검색
				</button>
			</div>
		</div>
	);
};

export default Step7;
