import { pool, pineconeIndex } from "./database.js";
import { getEmbedding } from "./search.js";


const storeProduct = async (product) => {
    const embedding= await getEmbedding(product.name);
    const embeddingValues  = embedding.embedding.values;
    
    const mariaResult = await pool.query(
        `INSERT INTO products ( name, price, description, image, quantity) VALUES  (?, ?, ?, ?, ?)`,
        [ product.name, product.price, product.description, product.image, product.quantity]
    );


    const response = await pineconeIndex.upsert([
        {
            id: mariaResult.insertId.toString(),
            values: embeddingValues,
        }
    ]);

}

const getProducts = async (searchText) => {

    const embedding = await getEmbedding(searchText);
    const embeddingValues = embedding.embedding.values;

    const response = await pineconeIndex.query({
        vector: embeddingValues,
        topK: 1000
    });

    const threshold = 0.7;
    console.log(response)

  

    const filteredResults = response.matches.filter(item => item.score > threshold);

    if(filteredResults.length === 0){
        return [];
    }

    const products = await pool.query(
        `SELECT * FROM products WHERE id IN (?)`,
        [filteredResults.map(item => item.id)]
    );

    return products;
};

export { storeProduct, getProducts };