
import 'dotenv/config';

const key = process.env.GEMINI_API_KEY;
const url = 'https://generativelanguage.googleapis.com/v1/models/embedding-001:embedContent';


const getEmbedding = async (text) => {
    const response = await fetch(url+`?key=${key}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: {
                parts: [{ text }]
            }
        })
    });
    return response.json();
}

export {getEmbedding};