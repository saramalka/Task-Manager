const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User=require("../Models/user.model")
const mongoose=require("mongoose")

const register=async(req,res)=>{
    const {name,password,email,role,teams}=req.body
    if (!name || !password || !email)
          return res.status(404).json({error:true, message:"name,password and email are required"})
    const duplicate = await User.findOne({email}).lean()
    if(duplicate){
        return res.status(409).json({message:"Duplicate username"})
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user=await User.create({name,password:passwordHash,email,role,teams})
    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);

    if (user) { 
      return res.status(200).json({
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          teams:user.teams
        }
      });
      
       
    } 
    else {
        return res.status(500).json({ message: 'Internal server error' });

    }
}



const getAllUsers= async (req, res) => {
    try{
      const users = await User.find().select('-password').lean();
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
    if (!name || !password || !_id || !email)
       return res.status(400).json('name, id and username are required fields')
    const idObjectId = new mongoose.Types.ObjectId(_id);
    const user= await User.findById(idObjectId).exec()
    if(!user)
        res.status(400).json('user is not exist')

    user.name=name
    user.email=email
    user.teams=teams
    user.role=role
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
  }
  

    const apdateUser= await user.save()
    res.json(`${apdateUser} updated`)
}

const deleteUser = async (req, res) => {
    const { id } = req.body

    try {
      const user = await User.findById(id).exec()
    if (!user) {
    return res.status(400).json({ message: 'User not found' })
    }
    const result = await user.deleteOne()
    const reply=`User '${user.name}' deleted`
    res.json(reply)
  } catch (error) {
      res.status(500).json({ message: 'Failed to delete user', error });
  }
    
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
            try {
              const { email, password,teams} = req.body;
              const user = await User.findOne({ email });
              if (!user) {
                return res.status(401).json({ message: 'User not found' });
              }
          
              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
              }
          

              const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);

              res.status(200).json({ user, token });
          
            } catch (err) {
              console.error('Login error:', err);
              res.status(500).json({ message: 'Internal server error' });
            }
  };

const checkEmail=async(req, res) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
      
    if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
    }
      
    res.status(200).json({ message: 'Email is available' });
        
    }  
          
    const getMe = async (req, res) => {
        const user = await User.findById(req.userId).select('-password');
        if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
        res.json(user);
      };
module.exports={getAllUsers,apdateUser,deleteUser,getUserByID,login,getMe,register,checkEmail}
