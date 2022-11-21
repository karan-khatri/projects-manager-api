import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.generateUserToken();
  res.status(StatusCodes.CREATED).json({ token, user: { name: user.name } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new BadRequestError('Please provide Email and Password!');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Please provide valid credentials');
  }
  const isMatch = await user.comparePassword(password);
  if (isMatch) {
    const token = user.generateUserToken();
    return res.status(StatusCodes.OK).json({ token, user: { name: user.name } });
  }
  throw new UnauthenticatedError('Please provide valid credentials!');
};

export { register, login };
