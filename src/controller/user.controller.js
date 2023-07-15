const { pool } = require("../database")

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
        console.log(params)
    }
    catch(err){
        console.log(err)
    }
}

const loginUser = async (req, res) =>{
    const {email, password} = req.body
    const params = [email,password];
    let sql = "SELECT id_user, name, last_name, email, photo FROM user WHERE email = ? AND password = ?;"

    try{
        
        let [result] = await pool.query(sql, params);
        res.send(result);
        // console.log(sql)
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
    
}

const updateUser = async (req, res) => {
    const {id_user, name, last_name, email, photo} = req.body;
    const params = [name, last_name, email, photo, id_user];
    const sql = "UPDATE user SET name = ?, last_name = ?, email = ?, photo = ? WHERE id_user = ?;";
  
    try {
      await pool.query(sql, params);
      res.send({ message: "Usuario actualizado" });
    } catch (err) {
      res.send({ error: "Error al actualizar el usuario" });
      console.log(err);
    }
};


module.exports = { postUser, loginUser, updateUser }