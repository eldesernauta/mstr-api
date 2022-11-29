const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.auth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return next(
            createError(401, "unauthorized: header not found")
        );
    }

    const token = authorization.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, "super secret!");

        User.findOne({ _id: decoded.sub, active: true })
            .then((user) => {
                if (user) {
                    req.user = user;
                    next();
                } else {
                    next(createError(401, "unauthorized: invalid user"));
                }
            })
            .catch(next);
    } catch (error) {
        next(createError(401, "unauthorized: invalid token"));
    }
};