import User from '../../models/user.model.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import validateProperty from '../../utils/validators/validateProperty.js';
import createToken from '../utils/token/createToken.js';

const login = async (req, res, _next) => {
  try {
    const { userName, password } = req.body;

    if (!validateProperty(userName) || !validateProperty(password)) {
      return res.status(400).json({
        error: 'Username and Password required'
      });
    }

    const userUname = await User.findOne({userName: userName});

    if (typeof userName !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        error: 'Username and Password must be of string type'
      });
    }

    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.status(404).json({
        error: 'User does not exist'
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        error: 'Invalid Password'
      });
    }

    user.loggedIn = true;

    const { accessToken, refreshToken } = createToken(userUname);

    return res.status(200).json({
      message: 'Successfully logged in',
      user: user,
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error(error);
  }
};

export default login;
