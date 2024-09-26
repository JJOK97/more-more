import React from 'react';

const ImageGrid = ({ images, onRemoveImage }) => (
    <div className="create-post-image-grid">
        {images.map((image, index) => (
            <div key={index} className="create-post-image-item">
                <img
                    src={image.preview}
                    alt={`Uploaded ${index + 1}`}
                    className="create-post-uploaded-image"
                />
                <button
                    onClick={() => onRemoveImage(index)}
                    className="create-post-remove-image"
                >
                    X
                </button>
            </div>
        ))}
    </div>
);

export default ImageGrid;