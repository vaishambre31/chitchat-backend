import jwt from 'jsonwebtoken'
import asynchandler from 'express-async-handler'

import User from '../models/userModel.js'

const auth = asynchandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        try {
            token = req.headers.authorization
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized , token invalid')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized')
    }
})

export {
    auth,
}