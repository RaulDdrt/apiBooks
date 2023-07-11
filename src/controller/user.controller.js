const { pool } = require("../database")

// const getBook = async (req, res) =>
// {
//     try
//     {
//         let sql;
//         if(req.query.id_user == null)    
//             sql = "SELECT * FROM user";
//         else
//             sql = "SELECT * FROM user WHERE id_user =" + req.query.id_user;
//         let [result] = await pool.query(sql);
//         res.send(result)
//     }

//     catch(err)
//     {
//         console.log(err)
//     }

// }

const postUser = async (req, res) => { 

    const {id_user, name, last_name, email, photo, password} = req.body
    const params = [id_user, name, last_name, email, photo, password]
    let sql = "INSERT INTO user (id_user, name, last_name, email, photo, password) VALUES (?, ?, ?, ?, ?, ?)"
    
    try{
        console.log(req.body)
        
        // let sql = "INSERT INTO student (student_id,first_name,last_name,groups_id,ingreso)" + "VALUES ('" + req.body.student_id + "' , '" + req.body.first_name + "' , '" + req.body.last_name + "' , '" + req.body.ingreso + "')";
        console.log(sql);
        let [result] = await pool.query(sql, params);
        console.log(result);
    }
    catch(err){
        console.log(err)
    }
}

const loginUser = async (req, res) =>{
    const { email, password } = req.body
    const params = [email,password];

    let sql = "SELECT id_user, name, last_name, email, photo FROM user WHERE email = ? AND password = ?;"
    let respuesta

    try{
        console.log(req.body)
        
        console.log(sql);
        let [result] = await pool.query(sql, params);
        if(result.length === 0){
            respuesta = "Usuario no encontrado"
        }else{
            respuesta = "Usuario encontrado"
        }

        console.log(respuesta);
    }
    catch(err){
        console.log(err)
    }
}

const getBooksByUser = async (req, res) =>{
    const{id_user,id_book} = req.query
    const params = [id_user, id_book];

    let sql;

    if(id_user != undefined && id_book == undefined){
        sql ="SELECT * FROM book WHERE id_users = ?;"
    }else{
        sql = "SELECT * FROM book WHERE id_users = ? AND id_book = ?"
    }

    try{
        const[data] = await pool.query(sql, params)
        if(data.length === 0){
            let respuesta = "Libro no encontrado"
            res.send(respuesta)
        }else{
            // respuesta = "Libro encontrado"
            res.send(data)
        }
    }catch(err){
        res.send(err)
    }
}

const postBook = async (req, res) =>{

    const {id_user, title, type, author, price, photo} = req.body
    const params = [id_user, title, type, author, price, photo]
    let sql = "INSERT INTO book (id_users, title, type, author, price, photo) VALUES (?, ?, ?, ?, ?, ?)"
    
    try{
        const[data] = await pool.query(sql, params)
        if(data.length === 0){
            let respuesta = "Libro no creado"
            res.send(respuesta)
        }else{
            // respuesta = "Libro registrado correctamente"
            res.send(data)
        }
    }catch(err){
        res.send(err)
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
    const params = [id_book]

    try{
        const[data] = await pool.query(sql, params)
        if(data.length === 0){
            let respuesta = "Libro no eliminado"
            res.send(respuesta)
        }else{
            // respuesta = "Libro eliminado"
            res.send(data)
        }
    }catch(err){
        res.send(err)
    }
    

}



module.exports = { postUser, loginUser, getBooksByUser, postBook, editBook, deleteBook }