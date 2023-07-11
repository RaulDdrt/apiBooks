const express = require("express");
const cors = require("cors");
const rutaUsuarios = require("./routers/user.routers")
const errorHandling = require("./error/errorHandling");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(rutaUsuarios); 
app.use((req, res, next) => {
  res.status(418).json({
    error: true,
    codigo: 418,
    mensaje: "I'm a teapot",
  });
});

app.use(errorHandling);

module.exports = app;