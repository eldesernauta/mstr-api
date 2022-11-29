const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PASSWORD_PATTERN = /^.{8,}$/
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: 'name is required'
    },
    email: {
        type: String,
        required: 'email is required',
        unique: true
    },
    password: {
        type: String,
        required: 'A valid password is required',
        match: [PASSWORD_PATTERN, 'the password is invalid']
    },
    bio: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    }
}, {
    tymeStamp: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret._v;
            delete ret.password;

            return ret
        }
    },
    toObject: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret._v;
            delete ret.password;

            return ret
        }
    }
})

userSchema.pre("save", function (next){
    if(this.isModified("password")){
        bcrypt.hash(this.password, 10).then((hash) => {
            this.password = hash;
            next()
        })
    }else {
        next()
    }
})

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password)
}

const User = mongoose.model("User", userSchema)
module.exports = User;