import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from '../services/fileService';
import { CommentSchema, Comment } from '../models/commentModel';

const COMMENTS_FILE = '../storage/comments.json';

export const getCommentsByPostId = async (req: Request, res: Response) => {
    try {
        const comments: Comment[] = await readFile(COMMENTS_FILE);
        const postComments = comments.filter((c) => c.postId === req.params.postId);
        res.status(200).json(postComments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

export const addComment = async (req: Request, res: Response) => {
    try {
        const commentData = CommentSchema.parse(req.body);
        const newComment: Comment = {
            id: uuidv4(),
            ...commentData,
            postId: req.params.postId,
            date: new Date().toISOString(),
        };
        let comments: Comment[] = await readFile(COMMENTS_FILE);
        comments.push(newComment);
        await writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2));
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        let comments: Comment[] = await readFile(COMMENTS_FILE);
        comments = comments.filter((c) => c.id !== req.params.commentId);
        await writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2));
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};