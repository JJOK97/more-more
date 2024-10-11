import React, { useRef } from 'react';

const ImageUpload = ({ onImageUpload }) => {
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        onImageUpload(newImages);
    };

    return (
        <label className="create-post-upload-label" htmlFor="imageUpload">
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
    );
};

export default ImageUpload;