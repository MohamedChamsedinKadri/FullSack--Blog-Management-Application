import { promises as fs } from 'fs';
import path from 'path';

const STORAGE_DIR = path.join(__dirname, '..', 'storage');

export const readFile = async (filePath: string) => {
    try {
        const fullPath = path.join(STORAGE_DIR, filePath);
        const data = await fs.readFile(fullPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return []; 
        }
        throw error;
    }
};

export const writeFile = async (filePath: string, data: string) => {
    try {
        const fullPath = path.join(STORAGE_DIR, filePath);
        await fs.writeFile(fullPath, data);
    } catch (error) {
        throw new Error(`Error writing to file: ${filePath}. ${error}`);
    }
};

