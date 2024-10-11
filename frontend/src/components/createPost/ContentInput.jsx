import React, { useRef, useEffect } from 'react';

const ContentInput = ({ content, setContent }) => {
	const textareaRef = useRef(null);

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
		<textarea
			className="create-post-textarea"
			ref={textareaRef}
			value={content}
			onChange={(e) => setContent(e.target.value)}
			rows="1"
			placeholder="내용을 입력하세요..."
		/>
	);
};

export default ContentInput;
