import express from "express";
import userModel from "../model/userModel.js";
import bcrypt from 'bcryptjs'; 
import JWTAction from '../../middleware/jwt.js';
import jwt from 'jsonwebtoken';



const insertacc = async (req, res) => {
  try {
      const { username, password, role } = req.body;
        
      const acc = await userModel.getAdmin(username);
      if (acc) {
          return res.status(400).json({ message: 'Username already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await userModel.insertAdmin(username, hashedPassword, role);

      res.status(200).json({ message: 'Created successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const login = async (req, res) => {
    try {
      const { username, password } = req.body;

      const acc = await userModel.getAdmin(username);      
      if (!acc) {
        return res.status(400).json({ message: 'Username không tồn tại' });
      }
      
      // Compare the entered password with the hashed password in the database
      const isPasswordMatch = await bcrypt.compare(password, acc.password);
      
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Mật khẩu không đúng' });
      }

      const payload = {
        username: acc.username,
        role: acc.role,
      };
  
      const token = JWTAction.createJWT(payload);
      console.log(token);
      res.cookie("jwt", token, { path: "/", httpOnly: false, secure: false, sameSite: 'Lax' });
      
      
      // If password matches, return success message
      return res.status(200).json({ message: 'Đăng nhập thành công', token, user: acc });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi xảy ra bên server' });
    }
  };

  const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        return res.redirect('/login');
    });
};



export default{insertacc, login, logout}