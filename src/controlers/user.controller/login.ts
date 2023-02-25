import User from '../../models/user.model';
import 'dotenv/config';
import IReqLogin from '../../interfaces/reqLogin.interface';
import IResLogin from '../../interfaces/resLogin.interface';

const login = async (req: IReqLogin, res, _next) => {
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

    return res.status(200).json({
      message: 'Successfully logged in',
      user: user
    });
  } catch (error) {
    console.error(error);
  }
};

export default login;
