import React, { createContext, useReducer, useContext } from 'react';

interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    tags: string[];
    date: string;
    bookmarked: boolean;
}

interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

type PostAction =
    | { type: 'SET_POSTS'; payload: Post[] }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
};

const PostContext = createContext<{
    state: PostState;
    dispatch: React.Dispatch<PostAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

const postReducer = (state: PostState, action: PostAction): PostState => {
    switch (action.type) {
        case 'SET_POSTS':
            return { ...state, posts: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, initialState);

    return (
        <PostContext.Provider value={{ state, dispatch }}>
            {children}
        </PostContext.Provider>
    );
};

const usePostsContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
};

export { PostProvider, usePostsContext, PostContext };

