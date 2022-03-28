import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import unless from 'express-unless';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'You must provide a token' });
  }

  const [, token] = authorization.split(' ');

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.loggedUser = payload;
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
};

authMiddleware.unless = unless;

export default authMiddleware;
