import express, { json } from 'express';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';
import {connect_to_mongo_db} from './config/mongo_db.js';
import { validateToken} from './middleware/authMiddleware.js';
import cors from 'cors';

dotenv.config(); // loads .env file to process.env var

const app = express();
const PORT = process.env.PORT || 5000;

// connect to db
connect_to_mongo_db();

// configure to read jsons
app.use(express.json());

// configure cors
app.use(cors());

app.get('/', (req,res) => {
  return res.status(200)
            .send('server started and root path is called');
});

// including all apis for authentication
app.use('/api/v1/auth',authRoutes);

// including all apis for books
app.use('/api/v1/books',validateToken, bookRoutes);

app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});

