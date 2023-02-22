import User from '../../models/user.model.js';

const register = async (req, res, _next) => {
  try {
    const { userName, password, age } = req.body;

    if (typeof userName === 'undefined' || typeof password === 'undefined' || typeof age === 'undefined') {
      return res.status(400).json({
        error: 'Username, Password and Age required'
      });
    }

    if (typeof userName !== 'string' || typeof password !== 'string' || typeof age !== 'number') {
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
