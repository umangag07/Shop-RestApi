const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

exports.get_all_user = async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (err) {
        res.send({ message: err })
    }
}
exports.user_signup = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                res.send({ message: "User Already exist." });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const NewUser = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                        });
                        NewUser.save()
                            .then((result) => {
                                console.log(result);
                                res.status(200).json({
                                    message: "User created successfully",
                                    UserDetail: {
                                        _id: result._id,
                                        email: result.email,
                                        password: result.password
                                    }
                                })
                            })
                            .catch((err) => {
                                console.log(err);
                                res.send({ message: err });
                            });
                    }
                });
            }
        })
        .catch(err=>{
            res.send({"err":err.message})
        })

}
exports.user_login = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            } else {
                bcrypt.compare(req.body.password, user[0].password, (error, response) => {
                    if (error) {
                        res.status(401).json({
                            message: "Auth Failed"
                        })
                    }
                    if (!response) {
                        res.status(401).json({
                            message: "Auth Failed"
                        })
                    } else {
                        const Token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "10m"
                            })
                        res.status(200).json({
                            message: "Auth success",
                            token: Token
                        })
                    }
                })
            }

        })
        .catch(err => {

        })
}
exports.user_delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
}