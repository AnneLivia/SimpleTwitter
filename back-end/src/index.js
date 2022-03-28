import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import tweetRouter from './routes/tweetRouter.js';
import cors from 'cors';
import authMiddleware from './middlewares/auth.middleware.js';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
dotenv.config();

const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log('DB connect'))
  .catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.json({ message: 'Simple Twitter API' });
});

app.use(
  authMiddleware.unless({
    path: [
      { url: /api\/login/ },
      { url: /api\/users/, methods: ['POST'] },
      { url: '/' },
    ],
  })
);

// to avoid 403 status code error
app.disable('etag');

app.use('/api', userRouter);
app.use('/api', tweetRouter);

app.listen(PORT, () => {
  console.log(`Server is on at port ${PORT}`);
});
