//dotenv
import { config } from 'dotenv';
config();

// security packages
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';

//express
import 'express-async-errors';
import express from 'express';
const app = express();

//connectDB
import connectDB from './db/connect.js';

//authentication middleware
import authenticateUser from './middleware/authentication.js';

// routers
import authRouter from './routes/auth.js';
import projectsRouter from './routes/projects.js';

// error handler
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.set('trust proxy', 1);
app.use(express.json());

// extra packages
app.use(
  rateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 100,
  })
);
app.use(cors());
app.use(helmet());
app.use(xss());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', authenticateUser, projectsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
