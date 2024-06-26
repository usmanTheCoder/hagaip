import Users from '../models/User.model.js'

const authAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id: req.user.id})

        if(user.role !== "admin") 
            return res.status(500).json({msg: "Admin resources access denied."})
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

export default authAdmin