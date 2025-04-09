import express from 'express';
import cors from "cors";
import usersRouter from './routes/users.routes';
import router from './routes';
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.NODE_PORT || '3333'

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use('/api', router)

app.listen(parseInt(port), host, () => console.log(`🚀 back gestor listening on port ${port}.`))
