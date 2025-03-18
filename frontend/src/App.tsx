import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import { PostProvider } from './context/PostContext';
import ExportButton from './components/ExportButton';
import { useVisits } from './hooks/useVisits';

const App: React.FC = () => {
    const { clearVisits } = useVisits();

    return (
        <PostProvider>
            <Router>
                <div className="container mx-auto p-4">
                    <header className="flex justify-between items-center mb-6 p-4 bg-white shadow rounded">
                        <Link to="/" className="text-2xl font-bold text-blue-600">Blog Management</Link>
                        <div className="flex items-center space-x-4">
                            <Link to="/create" className="btn-primary">Create Post</Link>
                            <ExportButton />
                            <button onClick={clearVisits} className="btn-secondary">Clear Visits</button>
                        </div>
                    </header>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/posts/:id" element={<PostDetail />} />
                        <Route path="/create" element={<CreatePost />} />
                        <Route path="/edit/:id" element={<EditPost />} />
                    </Routes>
                </div>
            </Router>
        </PostProvider>
    );
};

export default App;

