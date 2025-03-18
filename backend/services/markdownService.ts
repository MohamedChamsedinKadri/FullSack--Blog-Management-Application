import json2md from 'json2md';

export const convertToMarkdown = (post: any) => {
    return json2md([
        { h1: post.title },
        { p: post.content },
        { p: `Author: ${post.author}` },
        { p: `Tags: ${post.tags.join(', ')}` },
        { p: `Date: ${post.date}` },
    ]);
};

