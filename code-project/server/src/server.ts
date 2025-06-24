// Updated main server file
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from '../routes/auth';
import progressRoutes from '../routes/progress';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri: string =
    process.env.MONGODB_URI || 'mongodb+srv://fernandezegbscs:oeWqWkomfwIQm3em@cluster0.doyb6ww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

(async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
    } catch(error) {
        console.error(error);
    }
})();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('Server is running');
});

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});