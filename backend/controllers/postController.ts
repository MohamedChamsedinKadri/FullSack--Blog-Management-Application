import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from '../services/fileService';
import { PostSchema, Post } from '../models/postModel';
import { convertToMarkdown } from '../services/markdownService';
import { createZip } from '../services/zipService';
import path from 'path';
import fs from 'fs'; 

const COMMENTS_FILE = '../storage/comments.json';
const POSTS_FILE = '../storage/posts.json';



export const getAllPosts = async (req: Request, res: Response) => {
    try {
        let posts: Post[] = await readFile(POSTS_FILE);

        // Filtering by author and tag
        if (req.query.author) {
            posts = posts.filter(post => post.author === req.query.author);
        }
        if (req.query.tag) {
            posts = posts.filter(post => post.tags?.includes(req.query.tag as string) ?? false);
        }
        posts.sort((a, b) => {
            if (a.bookmarked && !b.bookmarked) {
                return -1; 
            }
            if (!a.bookmarked && b.bookmarked) {
                return 1;
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const posts: Post[] = await readFile(POSTS_FILE);
        const post = posts.find((p) => p.id === req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

export const toggleBookmark = async (req: Request, res: Response) => {
    try {
        let posts: Post[] = await readFile(POSTS_FILE);
        const postIndex = posts.findIndex((p) => p.id === req.params.id);
        if (postIndex === -1) {
            return res.status(404).json({ error: 'Post not found' });
        }
        posts[postIndex] = { ...posts[postIndex], bookmarked: !posts[postIndex].bookmarked };
        await writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
        res.status(200).json(posts[postIndex]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};


export const createPost = async (req: Request, res: Response) => {
    try {
        const postData = PostSchema.parse(req.body);

        const newPost: Post = {
            id: uuidv4(),
            ...postData,
            date: new Date().toISOString(),
            bookmarked: false,
        };
        let posts: Post[] = await readFile(POSTS_FILE);
        posts.push(newPost);
        await writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const postData = PostSchema.partial().parse(req.body);
        let posts: Post[] = await readFile(POSTS_FILE);
        const postIndex = posts.findIndex((p) => p.id === req.params.id);
        if (postIndex === -1) {
            return res.status(404).json({ error: 'Post not found' });
        }
        posts[postIndex] = { ...posts[postIndex], ...postData };
        await writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
        res.status(200).json(posts[postIndex]);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        let posts: Post[] = await readFile(POSTS_FILE);
        posts = posts.filter((p) => p.id !== req.params.id);
        await writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};
export const searchPosts = async (req: Request, res: Response) => {
    try {
        const searchQuery = req.query.q as string || ''; 
        const posts: Post[] = await readFile(POSTS_FILE); 

        const searchResults = posts.filter(post => 
            new RegExp(searchQuery, 'i').test(post.title) 
        );

        // Return the search results
        res.status(200).json(searchResults);
    } catch (error) {
        console.error('Error occurred during search:', error);
        res.status(500).json({ message: 'An error occurred while searching for posts', error });
    }
};


export const exportPosts = async (req: Request, res: Response) => {
    try {
        console.log('Starting exportPosts...'); 
        const posts: Post[] = await readFile(POSTS_FILE);
        const markdownFiles = posts.map((post) => ({
            filename: `${post.title.replace(/ /g, '_')}.md`,
            content: convertToMarkdown(post),
        }));
        console.log('Markdown files created:', markdownFiles); 
        const zipFilePath = await createZip(markdownFiles);
        console.log('Zip file created:', zipFilePath); 
        res.download(zipFilePath as string);
    } catch (error) {
        console.error('Error in exportPosts:', error); 
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};




