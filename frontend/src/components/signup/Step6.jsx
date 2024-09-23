import React from 'react';
import { useField, ErrorMessage, useFormikContext } from 'formik';
import ProfileImgIcon from '@/assets/img/common/profile_img.svg';

const Step6 = () => {
	const { setFieldValue, values } = useFormikContext();
	const [field, meta, helpers] = useField('profile_image');

	const handleChange = (event) => {
		const file = event.currentTarget.files[0];
		if (file) {
			setFieldValue('profile_image', file);
			const fileUrl = URL.createObjectURL(file);
			setFieldValue('profile_image_preview', fileUrl);
		} else {
			setFieldValue('profile_image', null);
			setFieldValue('profile_image_preview', null);
		}
	};

	const handleClick = () => {
		document.getElementById('profile_image').click();
	};

	return (
		<div className="registration-step-container">
			<div className="registration-step-title">프로필 등록</div>
			<div className="registration-step-content">
				<div className="welcome-message">
					프로필에 등록할 <br />
					이미지를 선택해주세요.
				</div>

				<div className="input-group">
					<input
						id="profile_image"
						name="profile_image"
						type="file"
						onChange={handleChange}
						onBlur={field.onBlur}
						accept="image/*"
						style={{ display: 'none' }}
					/>

					<div
						onClick={handleClick}
						className="image-area"
					>
						{values.profile_image_preview ? (
							<img
								src={values.profile_image_preview}
								alt="Profile preview"
							/>
						) : (
							<img
								src={ProfileImgIcon}
								alt="프로필 이미지 선택"
							/>
						)}
					</div>

					{meta.touched && meta.error && <div className="error-message">{meta.error}</div>}
				</div>
			</div>
		</div>
	);
};

export default Step6;
