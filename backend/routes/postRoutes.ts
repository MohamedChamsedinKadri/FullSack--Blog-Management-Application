import express from 'express';
import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    searchPosts,
    exportPosts,
    toggleBookmark,
} from '../controllers/postController';

const router = express.Router();

router.get('/search', searchPosts);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/export', exportPosts);
router.patch('/:id/bookmark', toggleBookmark);

export default router;



