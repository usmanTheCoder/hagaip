import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "./sendMail.js";
import mongoose from "mongoose";

export const userCtrl = {
  register: async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = req.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ msg: "User already exists!" });
      }
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ msg: "Password and confirm password doesn't match!" });
      }
      const newUser = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      };

      const activationToken = jwt.sign(
        newUser,
        process.env.ACTIVATION_TOKEN_SECRET,
        { expiresIn: "5m" }
      );

      const url = `${process.env.CLIENT_URL}/user/activation/${activationToken}`;

      sendEmail(email, url, "Please verify your email!");

      return res.status(200).json({
        msg: "A verification link has been sent to your email address!",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  activateEmail: async (req, res) => {
    const { activation_token } = req.body;
    try {
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const { firstName, lastName, email, phoneNumber, password } = user;
      const hashPassword = await bcrypt.hash(password, 16);
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashPassword,
      });
      return res
        .status(200)
        .json({ msg: "Email verified successfully!", newUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "Invaild email or password" });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ msg: "Invalid email or password" });
      }
      const refreshToken = await jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("refreshtoken", refreshToken, {
        path: "/user/refresh_token",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.status(200).json({ token: refreshToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const { refreshToken } = req.body;
      // const refreshToken = req.cookies.refreshtoken;
      if (!refreshToken)
        return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.status(400).json({ msg: "Please login now!" });

          const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );
          res.json({ accessToken });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      const url = `${process.env.CLIENT_URL}/user/reset/${accessToken}`;

      sendEmail(email, url, "Reset your password");
      res.json({
        msg: "Password reset link has been sent to your email address",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password, token } = req.body;
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const passwordHash = await bcrypt.hash(password, 12);

      await User.findOneAndUpdate(
        { _id: user.id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Password successfully changed!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      const users = await User.find().select("-password");
      let allUsers = users.filter((item) => {
        return item._id != req.user.id;
      });
      res.json(allUsers);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { image, firstName, lastName } = req.body;
      await User.findOneAndUpdate(
        { _id: req.user.id },
        { image, firstName, lastName }
      );

      res.json({ msg: "Updated Successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body;

      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          role,
        },
        { new: true }
      );

      res.json({ msg: "Role Updated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.json({ msg: "Deleted Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  adminUser: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        res.json("User already exists!");
        return;
      }
      const hashPassword = await bcrypt.hash(password, 16);
      await User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });
      res.status(200).json("User created successfully!");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
