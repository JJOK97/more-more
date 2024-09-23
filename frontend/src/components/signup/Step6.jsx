import React, { useState } from 'react';
import { useField, ErrorMessage, useFormikContext } from 'formik';

const Step6 = () => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField('profile_image');
	const [previewUrl, setPreviewUrl] = useState(null);

	const handleChange = (event) => {
		const file = event.currentTarget.files[0];
		if (file) {
			// File 객체를 직접 저장하는 대신 필요한 정보만 저장
			setFieldValue('profile_image', {
				name: file.name,
				type: file.type,
				size: file.size,
			});

			// 파일 미리보기 URL 생성
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div>
			<h2>Step 5: 프로필 이미지 업로드</h2>
			<div>
				<label htmlFor="profile_image">프로필 이미지</label>
				<input
					id="profile_image"
					name="profile_image"
					type="file"
					onChange={handleChange}
					onBlur={field.onBlur}
					accept="image/*"
				/>
				{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
				<ErrorMessage
					name="profile_image"
					component="div"
					className="error"
				/>

				{previewUrl && (
					<div>
						<h4>미리보기:</h4>
						<img
							src={previewUrl}
							alt="Profile preview"
							style={{ maxWidth: '200px' }}
						/>
					</div>
				)}

				{field.value && (
					<div>
						<h4>선택된 파일:</h4>
						<p>파일명: {field.value.name}</p>
						<p>파일 크기: {(field.value.size / 1024 / 1024).toFixed(2)} MB</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Step6;
