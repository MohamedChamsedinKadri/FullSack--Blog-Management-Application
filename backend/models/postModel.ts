import { z } from 'zod';

export const PostSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    author: z.string().min(1),
    tags: z.array(z.string()).default([]),
    bookmarked: z.boolean().optional(),
});

export type Post = z.infer<typeof PostSchema> & {
    id: string;
    date: string;
};


