import jwt from 'jsonwebtoken'

const responseStatus = (res, statusMessage, status, data) => {
    res.status(status).json({ statusMessage, status, data });
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
export {
    responseStatus,
    generateToken
}