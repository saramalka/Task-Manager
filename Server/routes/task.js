const express=require("express")
const router=express.Router()
const taskController=require("../Controllers/taskController")

router.use(express.json())

router.get("/",taskController.getAllTasks)


router.get("/:id",taskController.getTaskByTeam)
router.get("./taskId",taskController.getTaskById)
router.post("/", taskController.createTask)
router.put("/:id",taskController.editTask)
router.put("/:id/status",taskController.updateTaskStatus)
router.delete("/:id",taskController.deleteTask)

module.exports=router