const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const {verifyToken}=require("../middleware/verifyToken.middlware")
const {isAdmin}=require("../middleware/role.middleware")

router.use(express.json())

router.get("/",userController.getAllUsersAndTeams)
router.post('/login', userController.login);
router.post('/check-email',userController.checkEmail)
router.get('/me', verifyToken, userController.getMe);
router.get("/:id",userController.getUserByID)
router.post("/",userController.register)
router.put("/",userController.apdateUser)
router.delete("/", userController.deleteUser)


module.exports=router