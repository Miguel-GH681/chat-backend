const User = require('../models/user');
const Message = require('../models/message');


const userConnected = async (uid)=> {
    const user = await User.findById(uid);
    user.online = true;
    await user.save();
    return user;
}

const userDisconnected = async (uid)=> {
    const user = await User.findById(uid);
    user.online = false;
    await user.save();
    return user;
}

const saveMessage = async (payload)=>{
    try {
        const mensage = new Message(payload);
        await mensage.save();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    userConnected,
    userDisconnected,
    saveMessage
}