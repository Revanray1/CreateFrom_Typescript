// import {Pool} from "pg"
// import * as dotenv from 'dotenv';
// dotenv.config();

// // const pool = new Pool({

// //     user: process.env.DB_USER ,
// //     host: process.env.DB_HOST  || 'localhost',
// //     database: process.env.DB_NAME ,
// //     password: process.env.DB_PASSWORD,
// //     port: Number(process.env.DB_PORT) 
// // })

// // export default pool

// // Create a new Pool instance using the DATABASE_URL environment variable
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export default pool;

import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;

