const mongoose=require("mongoose")
const Task=require("../Models/task.model")
const Team=require("../Models/team.model")
const User=require("../Models/user.model")

const createTask=async(req,res)=>{
    const { title, status,priority,assignedTo,createdBy,comments } = req.body;
    const teamId=req.user.teamId
    console.log(req.user);
    
    try{
        if(!title|!teamId)
            return res.status(404).send('title, teamId are required')
        const task=await Task.create({title, teamId,status,priority,assignedTo,createdBy,comments})
        return res.send(task)
    }catch(err){
        return res.status(500).json({ message: 'Server error' });
    }
}
const getAllTasks=async(req,res)=>{
    try {
        const tasks = await Task.find(); 
        res.status(200).send(tasks); 
      } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).send('Server error');
      }
    
}
const getTaskAndUsersByTeam = async (req, res) => {
    try {
        
        const id = req.user.id;
        const teamId = await Team.findOne({ "members._id": id });

        if (!teamId)
            return res.status(404).json({ message: "No team found for user" });
        const user = await User.findById(new mongoose.Types.ObjectId(id));
     
        if (user) {
            if (!user.teams) user.teams = [];
            user.teams.push(teamId._id);
            await user.save();
        } else {
            console.log('user not found');
        }

        const users = await User.find({ teams: teamId._id });
        const tasks = await Task.find({ teamId: teamId._id })
            .populate('assignedTo')
            .populate('teamId')
            .populate('createdBy');

        res.status(200).send({ tasks, users });
    } catch (err) {
        console.log('Error in getTaskByTeam:', err);
        res.status(500).json({ message: 'Server error' });
    }
}


// const c=async(req,res)=>{
//     try{
//     const  id  = req.user.id;

//     const teamId = await Team.findOne({ "members._id": new mongoose.Types.ObjectId(id) });


//     if(!teamId)
//         return res.status(404).json({ message: "No team found for user" })
   
//     const users=await Task.find({ teamId: teamId._id })
//     .populate('userId')
    

//     res.status(200).send(users)
//     }catch(err){
//         console.log('Error in getUsersByTeam:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// }

const getTaskById=async(req,res)=>{
    
    try{
        const { id } = req.params;
        const taskObjectId = new mongoose.Types.ObjectId(id);
    const task=await Task.findById({taskId:taskObjectId})
    if(!task)
        res.status(404).send('task not found')
    res.send(task)
    }catch(err){
        console.log('Error in getTaskById:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

const editTask=async(req,res)=>{
    try{
        const {id}=req.params
        const{title,status,priority,assignedTo,teamId,createdBy,comments}=req.body
        const task=await Task.findById(id)
        if(!task)
            res.status(404).send('task not found')


        task.title=title??task.title
        task.status=status??task.status
        task.priority=priority??task.priority
        task.assignedTo=assignedTo??task.assignedTo
        task.teamId=teamId??task
        task.createdBy=createdBy??task.createdBy
        task.comments=comments??task.comments

        await task.save()
        res.json(`update task ${task}`)
        }catch(err){
            res.status(500).json({ message: 'Failed to edit task' });
        }       
}

const deleteTask=async(req,res)=>{
    try{
    const {id}=req.params
    const task=await Task.findById(id)
    if(!task)
        res.status(404).send('task not found')

   await Task.findByIdAndDelete(task)
    res.json('task deleted succesfuly')
}catch(err){
    res.status(500).json({ message: 'Failed to delete task' });
}  

}

const updateTaskStatus=async(req,res)=>{
    try{
        const userId=req.user.id
        const {taskId,status}=req.params
        

        const task=await Task.findById(taskId)
        if(!task)
            res.status(404).send('task not found')
        const isOwner = task.createdBy.toString() === userId;
        const isAssigned = task.assignedTo?.some(id => id.toString() === userId);

        if (!isOwner && !isAssigned) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }
        task.status=status
        await task.save()
       
        res.json('task status updated',task)
    }catch(err){
        res.status(500).json({ message: 'Failed to update status of task' });
    }  
    
}

module.exports={createTask,getTaskAndUsersByTeam,getTaskById,editTask,deleteTask,updateTaskStatus}
