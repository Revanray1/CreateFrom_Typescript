import express from 'express';
import * as dotenv from 'dotenv';
import './cron/deleteExpiredOtps';
import router from './routes';
import cors from 'cors';

dotenv.config();

const PORT = parseInt(process.env.PORTNUMBER as string); 
const corsOptions = {
  origin: '*', 
  methods: 'GET,POST,PUT,DELETE',
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));



// Apply CORS middleware

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Application working on port ${PORT}`);
});
