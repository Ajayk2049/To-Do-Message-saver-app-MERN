const express = require('express')
const router = express.Router()

const { storeMessage, listMessages, deleteMessage, deleteAllMessages, editMessage } = require('../controllers/messageController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/store', authMiddleware, storeMessage)

router.get('/list', authMiddleware, listMessages)

router.delete('/delete-one/:id',authMiddleware, deleteMessage)

router.delete('/delete-all/' ,authMiddleware, deleteAllMessages)

router.put('/edit/:id', authMiddleware , editMessage)

module.exports = router
