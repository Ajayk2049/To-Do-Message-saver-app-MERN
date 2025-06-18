const Message = require('../models/Message')

exports.storeMessage = async(req , res)=> {
    try {
        const {message} = req.body
        const userId = req.userId

        if (!message){
            return res.status(400).json({error:"message is required"})
        }
        const newMesaage = new Message({
            userId,
            message
        })
        await newMesaage.save()
        res.status(201).json({message: "message saved successfully"})
        
    } catch(err){
        console.error(err)
        res.status(500).json({error:"server error"})
    }
}


exports.listMessages = async (req, res) => {
  try {
    const userId = req.userId

    const messages = await Message.find({ userId }).sort({ _id: 1 })

    res.status(200).json(messages)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}

exports.deleteMessage = async (req, res) => {
   try {
     const userId = req.userId
    const messageId = req.params.id
     
    const deleted = await Message.findByIdAndDelete ({
        _id: messageId,
        userId: userId
    })

    if (!deleted) {
        return res.status(404).json({error:"message not found or unauthorized"})
    }
    res.status(200).json({message:"deleted"})
   }catch(err){
    console.error(err)
    res.status(500).json({error:'server error'})
   }
}

exports.deleteAllMessages = async (req, res)=> {
    try {
        const userId = req.userId
        const result = await Message.deleteMany({userId})
        res.status(200).json({message: `deleted ${result.deletedCount} messages`})
    }catch (err) {
        console.error(err)
        return res.status(500).json({error:'server error'})
    }
}

exports.editMessage = async (req , res) => {
    try {
        const userId = req.userId
        const {message} = req.body
        const messageId = req.params.id

        if (!message){
            return res.status(400).json({error:'new message is required'})
        }
        const updatedMessage = await Message.findOneAndUpdate(
            {_id:messageId, userId:userId},
            {message},
            {new:true}
        )
        if (!updatedMessage){
            return res.status(404).json({error:" no new message or unauthorized"})
        }
        res.status(200).json({message: "message updated", updated: updatedMessage.toObject()})
    }catch(err){
        console.error(err)
        res.status(500).json({error:'server error'})
    }
}
