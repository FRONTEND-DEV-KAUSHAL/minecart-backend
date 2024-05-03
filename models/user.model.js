const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        requuired: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    }
})

userSchema.pre('save', async function (next) {

    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(saltRounds)

    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
})

module.exports = mongoose.model('user', userSchema)