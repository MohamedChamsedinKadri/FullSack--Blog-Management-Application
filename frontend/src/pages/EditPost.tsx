import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, updatePost } from '../services/api';

const EditPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadPost = async () => {
            if (id) {
                try {
                    const postData = await fetchPostById(id);
                    setTitle(postData.title);
                    setContent(postData.content);
                    setAuthor(postData.author);
                    setTags(postData.tags.join(', '));
                } catch (error) {
                    console.error('Error loading post:', error);
                }
            }
        };
        loadPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedPost = {
            title,
            content,
            author,
            tags: tags.split(',').map(tag => tag.trim()),
        };
        try {
            await updatePost(id!, updatedPost);
            navigate(`/posts/${id}`);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full p-2 border rounded"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default EditPost;
