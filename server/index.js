import express from 'express';
const app = express();
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan'
import { fileURLToPath } from 'url';
import path from 'path';
import authRouter from './routers/authRouter.js';
import postsRouter from './routers/postsRouter.js';
import cors from 'cors';

import Connection from './db/dbCon/Connection.js';

dotenv.config();
const PORT = process.env.PORT || 8000;

// middlewares:
app.use(helmet());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // isi ke karan toh image dikhne laga
app.use(cors());

// Configuring the body-parser and router
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
// Static hosting:-
const __filename = fileURLToPath(import.meta.url); // getting filename
const __dirname = path.dirname(__filename);  // getting directory name
app.use(express.static(path.join(__dirname, "public/")))

// Database Connection:-
const DBConnection = () => {
    const result = Connection(process.env.MONGO_URL);
    if (result) {
        app.listen(PORT, console.log(`http://localhost:${PORT}`));
    }
}
DBConnection();
