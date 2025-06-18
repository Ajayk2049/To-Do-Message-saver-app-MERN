const mongoose = require('mongoose')

const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.mongo_URI)
        console.log("✅ mongoDB connected")
    } catch (err){
        console.error("❌ error connecting to mongo DB", err.message)
        process.exit(1)
    }
}
module.exports = connectDB