const { Pool } = require("pg");

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123456789',
    database: 'likeme',
    allowExisOnIdle:true,
    port: 5432,
});

const getPosts = async () => {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows;
    }; 
    
const agregarPost = async (post) => {
        const values = Object.values(post);
        const consulta = { text: "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (DEFAULT, $1, $2, $3, 0)", 
        values,
        } ;
        const result = await pool.query(consulta);
        return result.rows;
};    

const updatePost = async (id) => {
        const { rows } = await post.query("UPDATE posts SET likes = likes + 1 WHERE id = $1", [id]);
        return rows
};

const eliminarPost = async (id) => {
    const result = await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    console.log(result);
    return result.rows;
};

module.exports = {  getPosts, agregarPost, updatePost, eliminarPost };