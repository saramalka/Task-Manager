const Team=require("../Models/team.model")

const getAllUserTeams=async(req,res)=>{
    try{
    const teams=await Team.find().lean()
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

const createTeam = async (req,res)=>{
    try{
    const {name,createdBy,members,description} = req.body
    if(!name|!createdBy|!members)
        res.status(404).json("name , members and createdBy are required")
    const team = await Team.create({name,createdBy,members,description});
    res.json(team)
}
    catch (err) {
        res.status(500).json({ message: 'Failed to create team' });
      }  
}

const editTeam=async(req,res)=>{
    try{
        const { id } = req.params;
        const {name,createdBy,members,description}=req.body
        const team = await Team.findById(id);

        if (!team) return res.status(404).json({ message: 'Team not found' });

        team.name=name??team.name
        team.createdBy=createdBy??team.createdBy
        team.members=members??team.members
        team.description=description??team.description
    await team.save();
    res.json({ message: 'Team updated successfully', team });
}catch (err) {
    res.status(500).json({ message: 'Failed to update team' });
  }
}

const deleteTeam=async(req,res)=>{
    try{
    const id=req.params
    const team=await Team.findById(id)
    if(!team)
        res.status(404).send(`'Team not found'`)
    await Team.findByIdAndDelete(id);
    res.json({ message: 'Team deleted successfully' });
}
catch (err) {
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
  
  

module.exports={getAllUserTeams,getTeamById,createTeam,editTeam,deleteTeam,addMemberToTeam,removeMemberFromTeam}