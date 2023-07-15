const { pool } = require("../database")

const getBooksByUser = async (req, res) => {
    const { id_user, id_book } = req.query;
    const params = [id_user, id_book];
  
    let sql;
    let respuesta;
  
    if (id_user && !id_book) {
        sql = "SELECT * FROM book WHERE id_users = ?";
    } else {
        sql = "SELECT * FROM book WHERE id_users = ? AND id_book = ?";
    }
  
    try {
        const [data] = await pool.query(sql, params);
        if (data.length === 0) {
            respuesta = "Libro no encontrado";
            return res.status(404).json({ error: respuesta });
        } else {
            respuesta = data;
            return res.json(respuesta);
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const postBook = async (req, res) => {
    const {id_user, title, type, author, price, photo} = req.body;
    const params = [id_user, title, type, author, price, photo];
    console.log(req.body)
    console.log(params)
    let sql = "INSERT INTO book (id_users, title, type, author, price, photo) VALUES (?, ?, ?, ?, ?, ?)";
    // let sql = "INSERT INTO book (id_users, title, type, author, price, photo) VALUES (1, '" + title + "', 'Tapa Dura', 'prueba', 20, 'http');";
    try {
      const [data] = await pool.query(sql, params);
      console.log(sql)
      if (data.affectedRows === 0) {
        let respuesta = "Libro no creado";
        res.send(respuesta);
      } else {
        res.send(data);
        console.log(data);
      }
    } catch (err) {
      res.send(err);
    }
}
  
const editBook = async (req,res) => {
    const{id_book,id_user,title,type,author,price,photo} = req.body;
    const params = [ title? title: null, type? type: null, author? author: null, price? price:null,photo? photo:null, id_book? id_book:null, id_user? id_user:null];
    let sql = `UPDATE book SET title = COALESCE(?,title), type = COALESCE(?,type), author = COALESCE(?,author), price = COALESCE(?,price), photo = COALESCE(?,photo) WHERE id_book = ? AND id_users = ?;`;

    try{
        const[data] = await pool.query(sql, params)
        if(data.length === 0){
            let respuesta = "Libro no modificado"
            res.send(respuesta)
        }else{
            // respuesta = "Libro modificado"
            res.send(data)
        }
    }catch(err){
        res.send(err)
    }
}

const deleteBook = async (req, res) =>{
    
    let sql = "DELETE FROM book WHERE id_book = ?;"
    const {id_book} = req.query
    console.log(req.query)
    const params = [id_book]

    try{
        const[data] = await pool.query(sql, params)
        if(data.affectedRows === 0){
            let respuesta = "Libro no eliminado"
            res.send(respuesta)
        }else{
            respuesta = "Libro eliminado"
            res.send(data)
        }
    }catch(err){
        res.send(err)
    }
    

}

// const getAll = async (req, res) => {
//     try {
//       const sql = "SELECT * FROM book";
//       const [data] = await pool.query(sql);
  
//       if (data.length === 0) {
//         return res.status(404).json({ error: "No se encontraron libros" });
//       }
  
//       res.json(data);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
// };
  
module.exports = { getBooksByUser, postBook, editBook, deleteBook}