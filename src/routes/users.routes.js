import { Router } from 'express';

import validateUserRegister from '../dto/users-register.dto.js';
import validateUserLogin from '../dto/users-login.dto.js';
import validateUserData from '../dto/users-data.dto.js';
import validateUserPassword from '../dto/users-password.dto.js';
import validateUserEmail from '../dto/users-email.dto.js';
import validateUserUnregister from '../dto/users-unregister.dto.js';

import validateAuth from '../lib/auth-middleware.js';

import {
	getUsers,
	getUserData,
	createUser,
	logUser,
	editUser,
	resetUserPassword,
	resetUserEmail,
	deleteUser,
} from '../controllers/users.controller.js';

const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.post('/register', validateUserRegister, createUser);

usersRouter.post('/login', validateUserLogin, logUser);

usersRouter.get('/profile', validateAuth, getUserData);

usersRouter.patch('/', validateAuth, validateUserData, editUser);

usersRouter.patch(
	'/reset-password',
	validateAuth,
	validateUserPassword,
	resetUserPassword
);

usersRouter.patch(
	'/update-email',
	validateAuth,
	validateUserEmail,
	resetUserEmail
);

usersRouter.delete('/', validateAuth, validateUserUnregister, deleteUser);

export default usersRouter;
