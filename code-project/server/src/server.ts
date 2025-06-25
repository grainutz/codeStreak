import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import progressRoutes from './routes/progress';

dotenv.config();

const app: Express = express();

// Add request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri: string = process.env.MONGODB_URI || 'mongodb+srv://fernandezegbscs:oeWqWkomfwIQm3em@cluster0.doyb6ww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

(async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
    } catch(error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
})();

// Log when routes are mounted
console.log('Mounting auth routes at /api/auth');
app.use('/api/auth', authRoutes);

console.log('Mounting progress routes at /api/progress');
app.use('/api/progress', progressRoutes);

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Test route to verify server is working
app.get('/api/test', (_req: Request, res: Response) => {
    res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Global error handler:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use((req: Request, res: Response) => {
    console.log(`404 - Route not found: ${req.method} ${req.path}`);
    res.status(404).json({ error: 'Route not found' });
});

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    console.log('Available routes:');
    console.log('- GET  /health');
    console.log('- GET  /api/test');
    console.log('- POST /api/auth/register');
    console.log('- POST /api/auth/login');
    console.log('- GET  /api/auth/profile');
    console.log('- GET  /api/progress');
    console.log('- POST /api/progress/daily');
    console.log('- GET  /api/progress/weekly');
});