const express = require("express");
const cors = require("cors");

const {getPosts, agregarPost, updatePost, eliminarPost} = require("./consultas");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

app.get("/posts", async(req,res) => {
    try{
      const posts = await getPosts();
      res.send(posts);
    } catch (error) {
      res.status(500).send({
        error,
        message:"Not found ERROR 500", 
      });
    }
  });
  
app.post("/posts", async(req, res) => {
    try {
      const post = req.body;
      const result = await agregarPost(post);
      res.send(result);
     } catch(error){
        res.status(500).send(error);
     }
  });

app.put("/posts/like/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const result = await updatePost(id);
        res.send(result);
      } catch (error){
        res.status(500).send({error:"Error no se puede actualizar" });
     }
});
  
app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await eliminarPost(id);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: "Error al eliminar el post" });
    }
});
    
app.listen(PORT, console.log(`Servidor UP en puerto ${PORT}`))
