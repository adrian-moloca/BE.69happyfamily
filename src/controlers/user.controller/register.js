import User from '../../models/user.model.js';
import validateBodyRequest from '../../utils/validators/validateBodyRequest.js';
import verifyDataType from '../../utils/verify/verifyDataType.js';

const register = async (req, res, _next) => {
  try {
    const { isUndefined, message } = validateBodyRequest(req.body);
    const { userName, password, age } = req.body;

    // if (typeof userName === 'undefined' || typeof password === 'undefined' || typeof age === 'undefined') {
    //   return res.status(400).json({
    //     error: 'Username, Password and Age required'
    //   });
    // }

    if(isUndefined === true){
      return res.status(400).json({message: message});
    }

    if (!verifyDataType(userName, 'string') ||
        !verifyDataType(password, 'string') ||
        !verifyDataType(age, 'number')) {
      return res.status(400).json({
        error: 'Invalid type'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters'
      });
    }

    if (userName.length < 3) {
      return res.status(400).json({
        error: 'Username must be at least 3 characters'
      });
    }

    if(age < 18){
      return res.status(400).json({
        error: "Too young to use our platform"
      })
    }

    const userExists = await User.findOne({ userName: userName });

    if (userExists) {
      return res.status(409).json({
        error: 'User already exists'
      });
    }

    const newUser = new User({
      userName,
      password,
      age
    });

    await newUser
      .save()
      .then((user) => {
        user.loggedIn = true;
        return res.status(201).json({
          message: 'User Created!',
          user
        });
      })
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export default register;
