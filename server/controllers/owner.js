import Owner from "../models/owner.js"

export const createOwner = async (req, res) => {
    try {
        const owners = await Owner.find()
        if (owners.length > 0) {
            res.status(503).json({
                message: "you don't have permission to create a new product"
            })
        }
        const { fullname, email, password, } = req.body
        const owner = await Owner.create({
            fullname,
            email,
            password,
        })
        res.status(200).json(owner)

    } catch (error) {
        res.status(500).json({
            message: "Internal server errors"
        })
        console.error(error.message)
    }
}


export const createProduct=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const deleteProduct=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
    }
}






