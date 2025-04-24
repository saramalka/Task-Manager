const mongoose=require("mongoose")
const User=require("./user.model")

const teamScema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    members:{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User
        },
        role:{
            type:String,
            enum:['admin','member'],
            default:'member'
        }
    } ,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
},
  {timestamps:true}
  )

module.exports=mongoose.model("Team",teamScema)