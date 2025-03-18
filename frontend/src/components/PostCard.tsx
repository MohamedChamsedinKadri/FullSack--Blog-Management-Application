import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';
import VisitedBadge from './VisitedBadge';
import { usePosts } from '../hooks/usePosts';
import { updatePost, fetchPosts, deletePost } from '../services/api';
import { PostContext } from '../context/PostContext';
import { useContext } from 'react';

interface PostCardProps {
    post: any;
    isVisited: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isVisited }) => {
    const { posts, loading, error, search } = usePosts();
    const navigate = useNavigate();
    const { dispatch } = useContext(PostContext);

    const handleBookmarkClick = async () => {
        try {
            const updatedPost = { ...post, bookmarked: !post.bookmarked };
            await updatePost(post.id, updatedPost);
            const updatedPosts = await fetchPosts();
            dispatch({ type: 'SET_POSTS', payload: updatedPosts });
        } catch (error) {
            console.error('Error updating bookmark:', error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            await deletePost(post.id);
            const updatedPosts = await fetchPosts();
            dispatch({ type: 'SET_POSTS', payload: updatedPosts });
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="bg-white rounded shadow p-4 relative">
            <div className="flex justify-between items-center mb-2">
                <Link
                    to={`/posts/${post.id}`}
                    className="text-xl font-semibold text-blue-600 hover:underline"
                >
                    {post.title}
                </Link>
                <BookmarkButton
                    isBookmarked={post.bookmarked}
                    onClick={handleBookmarkClick}
                />
            </div>
            {isVisited && <VisitedBadge />}
            <p className="text-gray-600">Author: {post.author}</p>
            <p className="text-gray-600">
                Date: {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="mt-2">{post.content.substring(0, 100)}...</p>
            <Link
                to={`/posts/${post.id}`}
                className="text-blue-500 hover:underline"
            >
                Read More
            </Link>

            {post.tags && post.tags.length > 0 && (
                <div className="mt-2">
                    <span className="text-xs font-semibold text-gray-800 mr-2">
                        Tags:
                    </span>
                    <div className="flex flex-wrap">
                        {post.tags.map((tag: string, index: number) => (
                            <span
                                key={index}
                                className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="absolute bottom-2 right-2 flex space-x-2">
                <button
                    onClick={() => navigate(`/edit/${post.id}`)}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded text-sm"
                >
                    Edit
                </button>
                <button
                    onClick={handleDeleteClick}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PostCard;