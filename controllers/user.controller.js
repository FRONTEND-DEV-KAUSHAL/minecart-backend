const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken,');


const createUser = async(req, res) => {
    try{
         const {email} = req.body;

        const findEmail = await User.find({email}).lean().exec()

        if(findEmail.length){
            res.status(400).send({message: "Email Already Exists", success: false})
            return
        }

        const createUser = await User.create(req.body)

        if(!createUser) {
            res.status(400).send({message: "something went wrong!", success: false})
            return
        }
        res.status(200).send({message: "user created successfully", success: true})
    
    } catch(e) {
        console.log("create User error",e)
        res.status(500).send({message: "Internal Server Error", error: e, success: false})
    }
}

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        const findUser = await User.find({email}).lean().exec()

        if(!findUser.length){
            return res.status(404).send({message: "User not found!", success: false})
        }

        const isPasswordValid = await bcrypt.compare(password, findUser[0].password)

        if(!isPasswordValid) {
            res.status(401).send({message: "Email or password is invalid", success: false})
            return
        }
        let data  = {
            email: findUser[0].email,
            role: findUser[0].role
        }
        const token = generateToken(data)

        res.status(200).send({message: "Logged In successfully", success: true, data: findUser[0], accessToken: token})
    } catch(e) {
        console.log(e)
        res.status(500).send({message: "Internal Server Error", error: e, success: false})
    }
}


module.exports = { createUser, loginUser }