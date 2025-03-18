import { useState, useEffect } from 'react';
import { fetchComments, addComment, deleteComment as deleteCommentApi } from '../services/api';
import { Comment } from '../types/Comment';

export const useComments = (postId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadComments = async () => {
            setLoading(true);
            try {
                const commentsData: Comment[] = await fetchComments(postId);
                setComments(commentsData);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        if (postId) {
            loadComments();
        }
    }, [postId]);

    const createComment = async (commentData: { author: string; content: string }) => {
        try {
            const newComment = await addComment(postId, commentData);
            setComments(prevComments => [...prevComments, newComment]);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const removeComment = async (commentId: string) => {
        try {
            await deleteCommentApi(postId, commentId);
            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { comments, loading, error, createComment, removeComment };
};
