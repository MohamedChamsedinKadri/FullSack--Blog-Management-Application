// frontend/src/components/ExportButton.tsx
import React from 'react';
import { exportPosts } from '../services/api';

const ExportButton: React.FC = () => {
  const handleExport = async () => {
    try {
      const response = await exportPosts();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'posts.zip');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting posts:', error);
      alert('Failed to export posts.');
    }
  };

  return (
    <button onClick={handleExport} className="px-4 py-2 bg-green-500 text-white rounded">
      Export Posts
    </button>
  );
};

export default ExportButton;

