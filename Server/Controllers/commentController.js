const Comment=require("../Models/comment.model")

const createComment=async(req,res)=>{

    const {userId,taskId,content}=req.body
       if(!userId|!taskId|!content)
           res.status(400).send('userId,taskId,content are required')
   
       const comment=await Comment.create({userId,taskId,content})
       res.json(comment)
}

const getTaskComments=async(req,res)=>{
    const {taskId}=req.params

    try{
        const comments=await Comment.find({taskId})
        res.json(comments)
    }
catch(err){
    res.status(500).json({ error: "Failed to fetch comments", details: err.message })
}
}

module.exports={createComment,getTaskComments}