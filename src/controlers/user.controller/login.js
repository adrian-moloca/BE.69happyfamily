import User from '../../models/user.model.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const login = async (req, res, _next) => {
  try {
    const { userName, password } = req.body;

    if (typeof userName === 'undefined' || typeof password === 'undefined') {
      return res.status(400).json({
        error: 'Username and Password required'
      });
    }

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

    /*const accessToken = jwt.sign({payload: { x: 1, y: '2'}}, process.env.ACCESS_TOKEN_SECRET, (err) => {
      if (err) {
       return res.status(400).json({err: err});
      };
    });*/

    return res.status(200).json({
      message: 'Successfully logged in',
      user,
      // accessToken
    });
  } catch (error) {
    console.error(error);
  }
};

export default login;
