import React from 'react';

interface BookmarkButtonProps {
    isBookmarked: boolean;
    onClick: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isBookmarked, onClick }) => {
    return (
        <button onClick={onClick} className="text-yellow-500 text-3xl"> {}
            {isBookmarked ? '★' : '☆'}
        </button>
    );
};

export default BookmarkButton;