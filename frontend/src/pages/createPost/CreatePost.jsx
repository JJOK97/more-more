import React, { useState } from 'react';
import '@/assets/css/createPost/CreatePost.css';

const CreatePost = () => {
	const [image, setImage] = useState(null);
	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};
	const textarea = document.getElementById('auto-resize-textarea');
	textarea.addEventListener('input', autoResize);
	function autoResize() {
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	}
	return (
		<div className="create-post-container">
			<div className='create-post-upper'>
                <div className='create-post-upper-words'>글쓰기</div>
                <img className='create-post-upper-icon' src='/create/bill.svg' />
            </div>
			<textarea
				id="auto-resize-textarea"
				rows="1"
				placeholder="내용을 입력하세요..."
			/>
			<label
				className="create-post-upload-label"
				htmlFor="imageUpload"
			>
				{image ? (
					<img
						src={URL.createObjectURL(image)}
						alt="Uploaded"
					/>
				) : (
					<div className="create-post-upload-btn">
						<img
							className="create-post-upload-icon"
							src="/create/PlusCircle.svg"
						/>
						<div className="create-post-upload-words">사진 추가하기</div>
					</div>
				)}
				<input
					className="create-post-upload-input"
					type="file"
					id="imageUpload"
					accept="image/*"
					onChange={handleImageUpload}
				/>
			</label>
			<button className="create-post-finish-btn">
				<img className='create-post-finish-icon' src='/feed/edit.svg' />
				<div className='create-post-finish-words'>완료</div>
			</button>
		</div>
	);
};

export default CreatePost;
