import cors from "cors";
import express from 'express';
import router from './routes/index.routes';
import { errorLogger, requestLogger } from "./middlewares/logs";
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.NODE_PORT || '3333'

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(requestLogger);
app.use(errorLogger);
app.use('/api', router)

app.listen(parseInt(port), host, () => console.log(`🚀 back gestor listening on port ${port}.`))
