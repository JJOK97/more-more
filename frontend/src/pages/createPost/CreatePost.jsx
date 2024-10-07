import React, { useEffect, useState } from 'react';
import Header from '@/components/createPost/Header';
import ContentInput from '@/components/createPost/ContentInput';
import ImageGrid from '@/components/createPost/ImageGrid';
import ImageUpload from '@/components/createPost/ImageUpload';
import FinishButton from '@/components/createPost/FinishButton';
import '@/assets/css/createPost/CreatePost.css';
import useGroupName from '@/store/useGroupName';
import { useParams } from 'react-router-dom';

const CreatePost = () => {
	const { setGroupName } = useGroupName();
	const { groupId } = useParams(); // URL에서 groupId를 추출
	const [images, setImages] = useState([]);
	const [content, setContent] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

	useEffect(() => {
		setGroupName(groupId);
	}, []);

	const handleImageUpload = (newImages) => {
		setImages((prevImages) => [...prevImages, ...newImages]);
	};

	const handleRemoveImage = (index) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="create-post-container">
			<Header onBillIconClick={openModal} /> {/* Bill icon 클릭 시 모달 열기 */}
			<ContentInput
				content={content}
				setContent={setContent}
			/>
			<ImageGrid
				images={images}
				onRemoveImage={handleRemoveImage}
			/>
			<ImageUpload onImageUpload={handleImageUpload} />
			<FinishButton />
			{/* 모달 */}
			{isModalOpen && (
				<div
					className="invite-modal-overlay"
					onClick={closeModal}
				>
					<div
						className="modal-content"
						onClick={(e) => e.stopPropagation()}
					>
						<span
							className="close-button"
							onClick={closeModal}
						>
							&times;
						</span>
						<p>모달 콘텐츠</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreatePost;
