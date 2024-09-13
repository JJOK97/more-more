import React, { useState } from 'react';
import Header from '@/components/createPost/Header';
import ContentInput from '@/components/createPost/ContentInput';
import ImageGrid from '@/components/createPost/ImageGrid';
import ImageUpload from '@/components/createPost/ImageUpload';
import FinishButton from '@/components/createPost/FinishButton';
import '@/assets/css/createPost/CreatePost.css';

const CreatePost = () => {
    const [images, setImages] = useState([]);
    const [content, setContent] = useState('');

    const handleImageUpload = (newImages) => {
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    const handleRemoveImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
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