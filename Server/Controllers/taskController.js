const Team = require("../Models/team.model");
const User = require("../Models/user.model");
const Task=require("../Models/task.model")

const createTask=async(req,res)=>{
    const { title, teamId,status,priority,assignedTo,createdBy,comments } = req.body;
    try{
        if(!title|!teamId)
            res.status(404).send('title, teamId are required')
        const task=await Task.create({title, teamId,status,priority,assignedTo,createdBy,comments})
        res.send(task)
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
}

const getTaskByTeam=async(req,res)=>{
    try{
    const {teamId}=req.params
    const task=await Task.find({teamId})
    if(!task)
        res.status(404).send('task not found')
    res.send(task)
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
}

const getTaskById=async(req,res)=>{
    try{
    const {taskId}=req.params
    const task=await Task.findById(taskId)
    if(!task)
        res.status(404).send('task not found')
    res.send(task)
    }catch(err){
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
        const {id}=req.params
        const {status}=req.body
        const task=await Task.findById(id)
        if(!task)
            res.status(404).send('task not found')
    task.status=status
    await task.save()
       
        res.json('task status updated')
    }catch(err){
        res.status(500).json({ message: 'Failed to update status of task' });
    }  
    
}

module.exports={createTask,getTaskByTeam,getTaskById,editTask,deleteTask,updateTaskStatus}
