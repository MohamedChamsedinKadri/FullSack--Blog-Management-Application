import { useContext, useEffect, useState } from 'react';
import { usePostsContext } from '../context/PostContext';
import { fetchPosts, searchPosts } from '../services/api';

export const usePosts = () => {
    const { state, dispatch } = usePostsContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            if (!state.posts.length) {
                setLoading(true);
                try {
                    const postsData = await fetchPosts();
                    dispatch({ type: 'SET_POSTS', payload: postsData });
                } catch (err) {
                    setError((err as Error).message);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadPosts();
    }, [dispatch, state.posts.length]);

    const search = async (query: string) => {
        setLoading(true);
        setError(null);
        try {
            const results = await searchPosts(query);
            dispatch({ type: 'SET_POSTS', payload: results });
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { posts: state.posts, loading, error, search, dispatch };
};
