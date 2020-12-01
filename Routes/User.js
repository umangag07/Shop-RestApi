const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
router.post("/signup", (req, res) => {
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
      .then(result=>{
          console.log(result)
          res.send(result)
      })
      .catch(err=>{
          console.log(err)
          res.send({message:err})
      })
    }
  });
});
module.exports = router;
