import jwt from 'jsonwebtoken'

function authMiddleware(req, res, next){
    const token = req.header('Authorization')
    if(token === undefined)
        return res.status(401).send('Access denied')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        switch (error.name) {
            case 'JsonWebTokenError':
            case 'TokenExpiredError':
                res.status(401).send('Access denied')
                return;
            default:
                res.status(500).send('Internal Server Error');
                return;
        }
    }
}

export default authMiddleware