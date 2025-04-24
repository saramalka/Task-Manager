require("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const { default: mongoose } = require("mongoose")

const PORT=process.env.PORT||2000
const app=express()
connectDB()


app.use(cors(corsOptions))
app.use("/api/task", require("./routes/task"))
app.use("/api/user", require("./routes/user"))
app.use("/api/team", require("./routes/team"))

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello world!!")
})

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})