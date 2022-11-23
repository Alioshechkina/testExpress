// const bcrypt = require("bcrypt");
// const express = require("express");
// const User = require(./../models/users)
// const router = express.Router();

//   router.post("/register", async (req, res) => {
//     const body = req.body;

//     if (!(body.email && body.password)) {
//       return res.status(400).send({ error: "Data not formatted properly" });
//     }

//     // creating a new mongoose doc from user data
//     const user = new User(body);
//     // generate salt to hash password
//     const salt = await bcrypt.genSalt(10);
//     // now we set user password to hashed password
//     user.password = await bcrypt.hash(user.password, salt);
//     user.save().then((doc) => res.status(201).send(doc));
//   });