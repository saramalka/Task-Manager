const mongoose=require('mongoose')

const TaskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    status: {
         type: String,
         enum: ['complete', 'active', 'resolve','new'],
        default: 'new'
        },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
        },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
         required: true
        },
     dueDate: Date,
    createdBy: {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
        }]
    }, { timestamps: true });

module.exports=mongoose.model("Task",TaskSchema)