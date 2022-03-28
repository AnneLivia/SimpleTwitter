import bcryptjs from 'bcryptjs';
import UserModel from '../models/userModel.js';
import hashPassword from '../utils/hashPassword.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

class Controller {
  async index(req, res) {
    const users = await UserModel.find().lean();
    res.json({ users });
  }
  async getOne(req, res) {
    const id = req.params.id;

    try {
      const user = await UserModel.findById(id);
      if (user) return res.json({ user });

      res.status(404).json({ message: 'User not found' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Unexpected error' });
    }
  }
  async store(req, res) {
    const { email, name, password } = req.body;

    try {
      if (await UserModel.findOne({ email }))
        return res.status(400).json({ message: 'Email already exists' });

      const user = await UserModel.create({
        email,
        name,
        password: await hashPassword(password),
      });

      res.json({ user });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Unexpected error' });
    }
  }
  async update(req, res) {
    const { email, name, password } = req.body;
    const id = req.params.id;

    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        {
          email,
          name,
          password: await hashPassword(password),
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ user });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Unexpected error' });
    }
  }
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email }).lean();
      if (!user) return res.status(404).json({ message: 'User not found' });

      // check password
      if (!(await bcryptjs.compare(password, user.password)))
        return res.status(401).json({ message: 'Invalid password' });

      // sentitive information
      delete user.password;

      const token = jwt.sign(user, JWT_SECRET);

      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Unexpected error' });
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    try {
      const user = await UserModel.findByIdAndRemove(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'deleted succesfully' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Unexpected error' });
    }
  }
}

export default Controller;
