const jwt = require("jsonwebtoken");

const requireLogin = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader.jwt;
    if (token) {
        jwt.verify(token, process.env.AUTHENTICATION_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(403).json({ msg: 'Please login first' })
            } else {
                next()
            }
        })
    } else {
        return res.status(403).json({ msg: 'Please login first' })
    }
}

module.exports = { requireLogin };