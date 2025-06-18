const User = require ('../models/User.js')
const bcrypt = require('bcrypt')

exports.signup = async (req , res) => {
    try {
        const { name , email , password ,dob} = req.body
        
        if (!name,!email,!password,!dob) {
            return res.status(400).json({error:"all fields are required"}) 
        }
        const existingUser = await User.findOne({email})
        if (existingUser){
            return res.status(409).json({error:"user already exists"})
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            dob
        })
        await newUser.save()
        res.status(201).json({message:'signup successful'})
    } catch (err) {
        console.error(err)
        res.status(500).json({error:"server error"})
    }
}

const jwt = require('jsonwebtoken')
exports.login = async (req , res)=> {
    try {
     const {email , password} = req.body
     if (!email || !password) {
        return res.status(400).json({error:'email and password both are required'})
     }
     const user = await User.findOne({email})
     if (!user) {
        return res.status(401).json({error:'email or password incorrect'})
     }
     const passwordMatch = await bcrypt.compare(password , user.password)
     if (!passwordMatch) {
        return res.status(401).json({error:'email or password incorrect'})
     }
     const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
     )
     res.status(200).json({token , message:'login successful'})
    }catch (err) {
        console.error(err)
        res.status(500).json({error:"server Error"})
    }
}