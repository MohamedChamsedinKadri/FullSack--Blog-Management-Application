import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

export const createZip = async (files: { filename: string; content: string }[]) => {
    const zipFilePath = path.join(__dirname, '../storage/posts.zip');
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    return new Promise((resolve, reject) => {
        output.on('close', () => {
            console.log('Zip file created successfully:', zipFilePath); 
            resolve(zipFilePath);
        });
        archive.on('error', (err) => {
            console.error('Error creating zip file:', err);
            reject(err);
        });

        archive.pipe(output);
        files.forEach((file) => {
            archive.append(file.content, { name: file.filename });
        });
        archive.finalize();
    });
};



