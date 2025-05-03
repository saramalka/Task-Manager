const Team=require("../Models/team.model")
const mongoose=require("mongoose")

const getAllUserTeams=async(req,res)=>{
    try{
    
    const teams = await Team.find().populate('createdBy', 'name').populate('members.userId', 'name').lean()
    teams.forEach(team => {
      if (team.createdBy && team.createdBy._id) {
        team.createdBy._id = team.createdBy._id.toString();
      }
    })    

    if (!teams || teams.length === 0) {
        return res.status(404).send('No teams found');
      }
    res.json(teams);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
   
}

const getTeamById=async(req,res)=>{

   try{
     const {id}=req.params
    const teams=await Team.findById(id)
    if(!teams)
        res.status(400).send('no teams found')
    res.json(teams)
}catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}
const createTeam = async (req, res) => {
  try {
    console.log("createTeam Request body:", req.body);

    const createTeam = req.body;
    const members=createTeam.members?createTeam.members:[]
    
    const createdBy = new mongoose.Types.ObjectId(req.user.id);

    if (!createTeam.name || !createTeam.createdBy)
      return res.status(400).json({ message: "name, createdBy are required" });

    const memberObjectIds = Array.isArray(members)
      ? members.map((user, index) => {
          if (!user._id || !mongoose.Types.ObjectId.isValid(user._id)) {
            console.log(`Invalid member ID at index ${index}:`, user._id);
            throw new Error(`Invalid member ID: ${user._id}`);
          }
          return {
            "_id": new mongoose.Types.ObjectId(user._id),
            "role": user.role ?? "member"
          };
        })
      : [];

    const team = await Team.create({
      name:createTeam.name,
      createdBy, 
      members: memberObjectIds
    });

    res.json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to create team' });
  }
};


// const createTeam = async (req, res) => {
//   try {
//     console.log( "createTeam Request body:", req.user);

//     const { name, members } = req.body;
  
//     const createdBy = new mongoose.Types.ObjectId(req.user.id);

//     if (!name || !createdBy )
//       return res.status(400).json({ message: "name, createdBy are required" })

//     const memberObjectIds =Array.isArray(members)?
//       members.map((user, index) => {
//       if (!user._id || !mongoose.Types.ObjectId.isValid(user._id)) {
//         console.log(`Invalid member ID at index ${index}:`, user._id);
//         throw new Error(`Invalid member ID: ${user._id}`);
//       }
//       return{
//       "_id": new mongoose.Types.ObjectId(user._id),
//       "role":user.role??"member"
//     }
//     }):[]
//     const team = await Team.create({
//       name,
//       createdBy: createdByObjectId,
//       members: memberObjectIds
//     });

//     res.json(team);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: 'Failed to create team' });
//   }
// };

const editTeam=async(req,res)=>{
    try{
        const { id } = req.params;
        const idObjectId = new mongoose.Types.ObjectId(id);

        const {name,createdBy,members}=req.body
        const team = await Team.findById(idObjectId);

        if (!team) return res.status(404).json({ message: 'Team not found' });

        team.name=name??team.name
        team.createdBy=createdBy??team.createdBy
        team.members=members??team.members
        
    await team.save();
    res.json({ message: 'Team updated successfully', team });
}catch (err) {
    res.status(500).json({ message: 'Failed to update team' });
  }
}

const deleteTeam=async(req,res)=>{
    try{
    const {id}=req.params
    const idObjectId = new mongoose.Types.ObjectId(id);

    const team=await Team.findById(idObjectId)
    if(!team)
        return res.status(404).send(`'Team not found'`)
    await Team.findByIdAndDelete(idObjectId);
    res.json({ message: 'Team deleted successfully' });
}
catch (err) {
  console.log(err)
    res.status(500).json({ message: 'Failed to delete team' });
  }
}

const addMemberToTeam = async (req, res) => {
    try {
      const { id } = req.params; 
      const { userId } = req.body;
  
      const team = await Team.findById(id);
      if (!team) return res.status(404).json({ message: 'Team not found' });
  
      if (team.members.includes(userId)) {
        return res.status(400).json({ message: 'User already in the team' });
      }
  
      team.members.push(userId);
      await team.save();
  
      res.json({ message: 'Member added successfully', team });
    } catch (err) {
      res.status(500).json({ message: 'Failed to add member' });
    }
  };

const removeMemberFromTeam = async (req, res) => {
    try {
      const { id, userId } = req.params;
  
      const team = await Team.findById(id);
      if (!team) return res.status(404).json({ message: 'Team not found' });
  
      team.members = team.members.filter(memberId => memberId.toString() !== userId);
      await team.save();
  
      res.json({ message: 'Member removed successfully', team });
    } catch (err) {
      res.status(500).json({ message: 'Failed to remove member' });
    }
  };
  
  

module.exports={
  getAllUserTeams,
  getTeamById,
  createTeam,
  editTeam,
  deleteTeam,
  addMemberToTeam,
  removeMemberFromTeam
}