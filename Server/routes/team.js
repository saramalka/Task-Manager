const express=require("express")
const router=express.Router()
const teamController = require('../Controllers/teamController');
const { verifyToken } = require('../config/verifyToken');
const { isAdmin } = require('../config/role.middleware');

router.use(express.json())

router.get("/",teamController.getAllUserTeams)
router.get("/:id",teamController.getTeamById)
router.post('/', verifyToken, isAdmin, teamController.createTeam);
router.put("/",verifyToken,isAdmin,teamController.editTeam)
router.delete("/:id",verifyToken,isAdmin,teamController.deleteTeam)
router.post("/:id/members",verifyToken,isAdmin,teamController.addMemberToTeam)
router.delete("/:id/members/:userId",verifyToken,isAdmin,teamController.removeMemberFromTeam)

module.exports=router