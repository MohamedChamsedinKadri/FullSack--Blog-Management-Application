import { z } from 'zod';

export const CommentSchema = z.object({
    author: z.string().min(1),
    content: z.string().min(1),
});

export type Comment = z.infer<typeof CommentSchema> & {
    id: string;
    postId: string;
    date: string;
};


