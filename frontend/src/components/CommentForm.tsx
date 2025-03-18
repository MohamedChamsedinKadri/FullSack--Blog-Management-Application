import React, { useState } from 'react';
import { useComments } from '../hooks/useComments';

interface CommentFormProps {
    postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const { createComment } = useComments(postId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (author.trim() && content.trim()) {
            createComment({ author, content });
            setAuthor('');
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-2">
                <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-1">
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your Name"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-1">
                    Comment
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your comment"
                />
            </div>
            <button
                type="submit"
                className="rounded bg-blue-500 hover:bg-blue-700 px-4 py-2 font-bold text-white"
            >
                Add Comment
            </button>
        </form>
    );
};

export default CommentForm;
