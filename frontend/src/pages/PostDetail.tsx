import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import { fetchPostById } from '../services/api';
import { useTrackVisit } from '../hooks/useVisits';
import { useComments } from '../hooks/useComments';
import { formatDate } from '../services/utils';

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<any>(null);
    const { comments, loading: commentsLoading, error: commentsError, createComment, removeComment } = useComments(id!);

    useTrackVisit(id!);

    useEffect(() => {
        const loadPost = async () => {
            if (id) {
                const postData = await fetchPostById(id);
                setPost(postData);
            }
        };
        loadPost();
    }, [id]);

    if (!post) {
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-2">Author: {post.author}</p>
            <p className="text-gray-600 mb-4">Date: {formatDate(post.date)}</p>
            <div className="mb-8">{post.content}</div>
            <CommentForm postId={id!} />
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                {commentsLoading && <p>Loading comments...</p>}
                {commentsError && <p className="text-red-500">Error loading comments: {commentsError}</p>}
                <div className="space-y-4">
                    {comments.map(comment => (
                        <div key={comment.id} className="border p-4 rounded-md relative">
                            <p className="text-gray-700 font-semibold">{comment.author}</p>
                            <p className="text-sm text-gray-500">{formatDate(comment.date)}</p>
                            <p className="mt-2">{comment.content}</p>
                            <button
                                onClick={() => removeComment(comment.id)}
                                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 font-semibold rounded-md text-xs px-2 py-1"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    {comments.length === 0 && !commentsLoading && <p className="text-gray-500">No comments yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default PostDetail;

