import mongoose from "mongoose";
import db from "@/utils/db";
import User from "@/models/userSchema";

export default async function handler(req, res) {
  await db();
  if (req.mehtod === "POST") {
    try {
      const user = req.body.signup;

      //--------Validating user ----------------
      const existUser = await User.findOne(user);
      if (existUser) {
        return res.status(401).json({ message: "User already exists" });
      }

      //--------Creating new User------------------------

      const newUser = new User(user);

      await newUser.save();
      console.log("User saved");
      res.status(200).json({ message: "User Saved" });
    } catch (e) {
      console.error("Failed to create user", e);
      res.status(500).json({ message: "Error in user creation" });
    }
  }
  if (req.method === "GET") {
    console.log("start request");
    try {
     

      const username = req.query.login;
      const password = req.query.password;
      
      const userExist = await User.find({
        username: username,
        password: password
      });
      if (userExist) {
        res.status(200).json(userExist);
      } else {
        res.status(401).json({ message: "User does not exist" });
      }
    } catch (e) {
      console.error("Failed to get user", e);
      res.status(500).json({ message: "Error in getting user" });
    }
  }
}
