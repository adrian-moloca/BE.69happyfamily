import express from 'express';
import login from '../controlers/user.controller/login.js';
import register from '../controlers/user.controller/register.js';
import updateUser from '../controlers/user.controller/updateUser.js';
import userDelete from '../controlers/user.controller/userDelete.js';

const userRoutes = express.Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.patch('/:userId/update', updateUser);
userRoutes.delete('/:userId/delete', userDelete);

export default userRoutes;
