const mongoose = require ('mongoose')

const messageSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    message: {type: String , required: true},
    pinned : {type: Boolean , default: false}
})
module.exports = mongoose.model('message', messageSchema)