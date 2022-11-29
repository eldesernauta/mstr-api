const User = require('../models/user.model')
const jwt = require("jsonwebtoken");
const createError = require('http-errors');

module.exports.list = (req, res, next) => {

    User.find()
        .then(users => res.status(200).json(users))
        .catch(next);

}

module.exports.create = (req, res, next) => {

    const data = { text } = req.body;
    User.create({
        ...data
    })
        .then(users => res.status(201).json(users))
        .catch((error) => {
            res.status(400).json(error);
            next;
        });

}

module.exports.activate = (req, res, next) => {
    User.findByIdAndUpdate(
        req.params.id,
        { active: true },
        { new: true, runValidators: true }
    )
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                next(createError(404, "user not found"));
            }
        })
        .catch(next);
};

module.exports.login = (req, res, next) => {
    const { email, password } = req.body

    User.findOne({ email })
        .then((user) => {
            if (user) {
                user.checkPassword(password).then((match) => {
                    if (match) {
                        const token = jwt.sign(
                            { sub: user.id, exp: Date.now() / 1000 + 3600 },
                            "super secret!"
                        )
                        res.json({ token })
                    } else {
                        next(createError(401, "unauthorized"))
                    }
                })
            } else {
                next(createError(401, "unauthorized"))
            }
        })
        .catch(next)
}
