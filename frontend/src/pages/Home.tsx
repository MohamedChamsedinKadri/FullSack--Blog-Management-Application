import React from 'react';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import { useVisits } from '../hooks/useVisits';

const Home: React.FC = () => {
    const { posts, loading, error, search } = usePosts();
    const { visits } = useVisits();

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <SearchBar onSearch={search} />
            {posts.length === 0 && !loading && !error && (
                <p className="text-gray-500 text-center">No posts found.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} isVisited={visits.includes(post.id)} />
                ))}
            </div>
        </div>
    );
};

export default Home;

