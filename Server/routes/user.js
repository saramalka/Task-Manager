const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const {verifyToken}=require("../config/verifyToken")
const {isAdmin}=require("../config/role.middleware")

router.use(express.json())

router.get("/",userController.getAllUsers)
router.post('/login', userController.login);
router.get('/me', verifyToken, userController.getMe);
router.get("/:id",userController.getUserByID)
router.post("/",userController.register)
router.put("/",userController.apdateUser)
router.delete("/",verifyToken, isAdmin, userController.deleteUser)


module.exports=router