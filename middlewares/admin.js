const jwt = require('jsonwebtoken')
const User = require('../models/Users')

const admin = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: data.id})
        if (!user) {
            throw new Error()
        } else if (user.rol !== 'admin'){
            throw new Error()
        }
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
module.exports = admin