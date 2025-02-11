import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/todos', todoRoutes);

app.use((err : Error, req : express.Request, res : express.Response, next : express.NextFunction) => {
    res.status(500).json({message: err.message});
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
