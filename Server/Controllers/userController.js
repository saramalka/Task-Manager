const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User=require("../Models/user.model")
const mongoose=require("mongoose")

const register=async(req,res)=>{
    const {name,password,email}=req.body
        if(!name|!password|!email)
            res.status(404).json({error:true, message:"name,password and email are required"})
    const duplicate = await User.findOne({name}).lean()
    if(duplicate){
        return res.status(409).json({message:"Duplicate username"})
    }
    const passwordHash = await bcrypt.hash(password, 10);
        const user=await User.create({name,password:passwordHash,email})

    if (user) { 
        return res.status(201).json(user)
    } 
    else {
        return res.status(400).json({ message: 'Invalid user' })
    }
}



const getAllUsers= async (req, res) => {
    try{
    const users = await User.find().lean()
   
    if (!users?.length) {
         return res.status(400).json({ message: 'No users found' })
    }
    res.json(users)
}catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

const apdateUser=async(req,res)=>{
    const{name,_id,password,email,teams,role}=req.body
    if(!name||!password||!_id|!email)
        res.status(400).json('name, id and username are required fields')
    const idObjectId = new mongoose.Types.ObjectId(_id);
    const user= await User.findById(idObjectId).exec()
    if(!user)
        res.status(400).json('user is not exist')

    user.name=name
    user.password=password
    user.email=email
    user.teams=teams
    user.role=role

    const apdateUser= await user.save()
    res.json(`${apdateUser} updated`)
}

const deleteUser = async (req, res) => {
    const { _id } = req.body
    const idObjectId = new mongoose.Types.ObjectId(_id);
    const user = await User.findById(idObjectId).exec()
    if (!user) {
    return res.status(400).json({ message: 'User not found' })
    }
    const result = await user.deleteOne()
    const reply=`User '${result.name}' deleted`
    res.json(reply)
    }

const getUserByID = async (req, res) => {
        const {id} = req.params
        const idObjectId = new mongoose.Types.ObjectId(id);
        const user = await User.findById(idObjectId).lean()
       
        if (!user) {
        return res.status(400).json({ message: 'No user found' })
        }
        res.json(user)
        }

const login = async (req, res) => {
    console.log("LOGIN BODY", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();
    console.log(user);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
}

const checkEmail=async(req, res) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
      
    if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
    }
      
    res.status(200).json({ message: 'Email is available' });
    
          
    if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
          
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          
        res.json({ token });
        
    }  
          
    const getMe = async (req, res) => {
        const user = await User.findById(req.userId).select('-password');
        res.json(user);
      };
module.exports={getAllUsers,apdateUser,deleteUser,getUserByID,login,getMe,register,checkEmail}
