const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
        },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
        },
    password:{
        type: String,
        required: true
        },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
        }],
        teams:{
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    }

},{timestamps: true})

module.exports=mongoose.model("User",UserSchema)