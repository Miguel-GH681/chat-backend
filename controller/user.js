const User = require('../models/user');

const getUsers = async (req, res)=>{

    const since = Number(req.query.since) ?? 0;
    const limit = Number(req.query.limit) ?? 5;

    const users = await User
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(since)
        .limit(limit);

    res.json({
        ok: true,
        msg: users
    });
}

module.exports = {
    getUsers
}