const express=require("express")
const router=express.Router()
const teamController = require('../Controllers/teamController');
const { verifyToken } = require('../middleware/verifyToken.middlware');
const { isAdmin } = require('../middleware/role.middleware');

router.use(express.json())

router.get("/",teamController.getAllUserTeams)
router.get("/:id",teamController.getTeamById)
router.post('/',verifyToken, teamController.createTeam)
//  verifyToken, isAdmin,
router.put("/:id",teamController.editTeam)
router.delete("/:id",teamController.deleteTeam)
router.post("/:id/members",verifyToken,isAdmin,verifyToken,isAdmin,teamController.addMemberToTeam)
router.delete("/:id/members/:userId",teamController.removeMemberFromTeam)

module.exports=router