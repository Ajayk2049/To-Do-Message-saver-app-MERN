const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')

dotenv.config()
console.log('MONGO_URI:', process.env.MONGO_URI)
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/authRoutes')
app.use('/api/auth',authRoutes)

const messageRoutes = require('./routes/messageRoutes')
app.use('/api/messages', messageRoutes)


app.get("/", (req, res)=>{
    res.send('✅ API is running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT ,'0.0.0.0',()=>{
    console.log(`server running at port:${PORT}`)
})