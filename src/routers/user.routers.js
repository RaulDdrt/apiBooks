const {Router} = require ("express");
const router = Router();
const userCtrl = require("../controller/user.controller")

router.post("/register", userCtrl.postUser)
// router.get("/prueba" , bookCtrl.getBook)
router.post("/login", userCtrl.loginUser)
router.put("/usuarios", userCtrl.updateUser)



module.exports = router