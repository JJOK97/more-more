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

	useEffect(() => {
		setGroupName(groupId);
	}, []);

	const handleImageUpload = (newImages) => {
		setImages((prevImages) => [...prevImages, ...newImages]);
	};

	const handleRemoveImage = (index) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	return (
		<div className="create-post-container">
			<Header />
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
		</div>
	);
};

export default CreatePost;
