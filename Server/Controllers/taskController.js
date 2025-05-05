const mongoose=require("mongoose")
const Task=require("../Models/task.model")
const Team=require("../Models/team.model")


const createTask=async(req,res)=>{
    const { title, teamId,status,priority,assignedTo,createdBy,comments } = req.body;
    try{
        if(!title|!teamId)
            res.status(404).send('title, teamId are required')
        const task=await Task.create({title, teamId,status,priority,assignedTo,createdBy,comments})
        return res.send(task)
    }catch(err){
        return res.status(500).json({ message: 'Server error' });
    }
}
const getAllTasks=async(req,res)=>{
    const task=await Task.find()
    if(!task)
        res.status(404).send('task not found')
    res.send(task)
}
const getTaskByTeam=async(req,res)=>{
    try{
    const  id  = req.user.id;

    const teamId= await Team.findOne({"members._id":id})
    if(!teamId)
        return res.status(404).json({ message: "No team found for user" })
   
    const tasks=await Task.find({ teamId: teamId._id })
    .populate('assignedTo')
    .populate('teamId')
    // .populate('comments')
    .populate('createdBy')

    if(!tasks)
        return res.status(404).json({ message: "No tasks found for team" })
    res.send(tasks)
    }catch(err){
        console.log('Error in getTaskByTeam:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

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

module.exports={createTask,getTaskByTeam,getTaskById,editTask,deleteTask,updateTaskStatus}
