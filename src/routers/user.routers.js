const {Router} = require ("express");
const router = Router();
const bookCtrl = require("../controller/user.controller")

router.post("/register", bookCtrl.postUser)
// router.get("/prueba" , bookCtrl.getBook)
router.post("/login", bookCtrl.loginUser)
router.get("/books" , bookCtrl.getBooksByUser)
router.post("/books" , bookCtrl.postBook)
router.put("/books" , bookCtrl.editBook)
router.delete("/books" , bookCtrl.deleteBook)


module.exports = router