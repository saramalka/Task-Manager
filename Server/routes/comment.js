const express=require("express")
const router=express.Router()
const commentController=require("../Controllers/commentController")


router.get("/:taskId",require(commentController.getTaskComments))

router.post("/",require(commentController.createComment))

module.exports=router
