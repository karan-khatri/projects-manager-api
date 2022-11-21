import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const authToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    throw new UnauthenticatedError('Authentication failed!');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name } = decoded;
    //attach the user to job routes
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication failed!');
  }
};

export default authToken;
