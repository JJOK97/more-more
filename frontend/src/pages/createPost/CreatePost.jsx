import React, { useState, useRef, useEffect } from 'react';
import '@/assets/css/createPost/CreatePost.css';

const CreatePost = () => {
    const [images, setImages] = useState([]);
    const [content, setContent] = useState('');
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleRemoveImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        const autoResize = () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };
        
        textarea.addEventListener('input', autoResize);
        
        return () => {
            textarea.removeEventListener('input', autoResize);
        };
    }, []);

    return (
        <div className="create-post-container">
            <div className='create-post-upper'>
                <div className='create-post-upper-words'>글쓰기</div>
                <img className='create-post-upper-icon' src='/create/bill.svg' alt="Bill icon" />
            </div>
            <textarea
                ref={textareaRef}
                value={content}
                onChange={handleContentChange}
                rows="1"
                placeholder="내용을 입력하세요..."
            />
            <div className="create-post-image-grid">
                {images.map((image, index) => (
                    <div key={index} className="create-post-image-item">
                        <img
                            src={image.preview}
                            alt={`Uploaded ${index + 1}`}
                            className="create-post-uploaded-image"
                        />
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="create-post-remove-image"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
            <label
                className="create-post-upload-label"
                htmlFor="imageUpload"
            >
                <div className="create-post-upload-btn">
                    <img
                        className="create-post-upload-icon"
                        src="/create/PlusCircle.svg"
                        alt="Plus circle"
                    />
                    <div className="create-post-upload-words">사진 추가하기</div>
                </div>
                <input
                    ref={fileInputRef}
                    className="create-post-upload-input"
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    multiple
                />
            </label>
            <button className="create-post-finish-btn">
                <img className='create-post-finish-icon' src='/feed/edit.svg' alt="Edit icon" />
                <div className='create-post-finish-words'>완료</div>
            </button>
        </div>
    );
};

export default CreatePost;