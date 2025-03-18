import { z } from 'zod';
import { PostSchema } from '../models/postModel';
import { CommentSchema } from '../models/commentModel';

export const validatePost = (data: any) => {
    return PostSchema.safeParse(data);
};

export const validateComment = (data: any) => {
    return CommentSchema.safeParse(data);
};

