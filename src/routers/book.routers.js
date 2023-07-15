const {Router} = require ("express");
const router = Router();
const bookCtrl = require("../controller/book.controller")

router.get("/books" , bookCtrl.getBooksByUser)
router.post("/books" , bookCtrl.postBook)
router.put("/books" , bookCtrl.editBook)
router.delete("/books" , bookCtrl.deleteBook)
// router.get("/books" , bookCtrl.getAll)


module.exports = router