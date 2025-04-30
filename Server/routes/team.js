const express=require("express")
const router=express.Router()
const teamController = require('../Controllers/teamController');
const { verifyToken } = require('../config/verifyToken');
const { isAdmin } = require('../config/role.middleware');

router.use(express.json())

router.get("/",teamController.getAllUserTeams)
router.get("/:id",teamController.getTeamById)
router.post('/', teamController.createTeam);
//  verifyToken, isAdmin,
router.put("/:id",teamController.editTeam)
router.delete("/:id",teamController.deleteTeam)
router.post("/:id/members",verifyToken,isAdmin,teamController.addMemberToTeam)
router.delete("/:id/members/:userId",verifyToken,isAdmin,teamController.removeMemberFromTeam)

module.exports=router