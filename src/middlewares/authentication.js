const jwt = require('jsonwebtoken');
const secret = process.env.AUTHENTICATION_SECRET;


exports.authenticateUser = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Authorization header required' });
    }

    let splitHeader = req.headers.authorization.split(' ');

    let bearer = splitHeader[0];

    if (bearer !== 'Bearer') {
        return res.status(401).json({ message: 'Authorization format is Bearer <token>' });
    }

    let token = splitHeader[1];

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(500).json({ err });
        }
        if (!decodedToken) {
            return res.status(401).json({ message: 'Invalid authorization token. Please login.' });
        }
        req.user = decodedToken;
        next();
    })
}