import { Pinecone } from '@pinecone-database/pinecone'; 
import mariadb from 'mariadb';
import 'dotenv/config';


const pinecone = new Pinecone({apiKey:process.env.PINECONE_API_KEY});
const pineconeIndex = pinecone.index('products-embeddings');


const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME


const pool = mariadb.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 5
});

pool.getConnection((err, connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
        console.error('Database connection was closed');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
        console.error('Database has too many connections');
        }
        if(err.code === 'ECONNREFUSED'){
        console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();
    return;
});

export { pool, pineconeIndex };