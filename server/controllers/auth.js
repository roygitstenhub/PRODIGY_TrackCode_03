import User from "../models/user.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"


export const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const userExist = await User.findOne({ email }).lean()

        if (userExist) {
            res.status(400).json({ message: "user already exist" })
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const user = await User.create({ username, email, password: hashPassword })
            if (user) {
                generateToken(res,user._id)
                res.status(201).json({
                    user
                })

            } else {
                res.status(400).json({ message: " Invalid user data " })
            }

        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            generateToken(res,user._id)
            res.status(200).json({
                user
            })

        } else {
            res.status(404).json({ message: "Inavalid name or password" })
        }

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const Profile = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
}

export const Logout = (req, res) => {
    res.cookie("jwt", '')
    res.status(200).json({
        message: "user logged out"
    })
}