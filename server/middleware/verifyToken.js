import jwt from "jsonwebtoken"
import User from "../models/user.js"

const verifyToken = async (req, res, next) => {
    let token
    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            // @except passord select all data
            req.user = await User.findById(decoded.userId).select("-password")
            next()

        } catch (error) {
            res.status(401).json({
                message: "Not authorized, token failed"
            })

        }

    } else {
        res.status(401).json({
            message: "Not authorized, no token"
        })
    }

}

export default verifyToken


