import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo';
import cors from 'cors';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err);
});
  
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
}));

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})