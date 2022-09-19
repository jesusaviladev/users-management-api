import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/profile', (req, res) => {
	res.status(200).json({
		message: 'get success :)',
	});
});

usersRouter.post('/register', (req, res) => {
	res.status(201).json({
		message: 'created',
	});
});

usersRouter.post('/login', (req, res) => {
	res.status(200).json({
		message: 'login',
	});
});

usersRouter.patch('/:id', (req, res) => {
	res.status(200).json({
		message: 'patch success',
	});
});

usersRouter.patch('/reset-password', (req, res) => {
	res.status(200).json({
		message: 'patch success',
	});
});

usersRouter.patch('/update-email', (req, res) => {
	res.status(200).json({
		message: 'patch success',
	});
});

usersRouter.delete('/:id', (req, res) => {
	res.status(200).json({
		message: 'delete success',
	});
});

export default usersRouter;
