import express from 'express';
import {
    getCommentsByPostId,
    addComment,
    deleteComment,
} from '../controllers/commentController';

const router = express.Router();

router.get('/:postId/comments', getCommentsByPostId);
router.post('/:postId/comments', addComment);
router.delete('/:postId/comments/:commentId', deleteComment);

export default router;


