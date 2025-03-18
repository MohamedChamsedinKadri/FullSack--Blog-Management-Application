import express from 'express';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

app.use(cors());
app.use(express.json());

// Test route
app.get('/test-route', (req, res) => {
    res.status(200).send('Test route works!');
});

// Routes
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

export default app;

