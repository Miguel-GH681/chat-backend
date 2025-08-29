const Message = require('../models/message');

const getMessages = async (req, res)=>{
    try {
        const fromId = req.uid;
        const toId = req.params.id;

        const messages = await Message.find({
            $or: [{ from: fromId, to: toId }, { from: toId, to: fromId }]
        })
        .sort({ createdAt: 'desc' })
        .limit(30);

        res.json({
            ok: true,
            msg: messages
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
}

module.exports = {
    getMessages
}