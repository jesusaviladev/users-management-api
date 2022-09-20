/* Express app */
import express from 'express';

/* Routes */
import usersRouter from '../routes/users.routes.js';

const app = express();

// middlewares

app.use(express.json());

// routes
app.get('/', (req, res) => res.status(200).json({ message: 'Users API' }));

app.use('/api/users', usersRouter);

// error handling middlewares

app.use('/', (req, res, next) =>
	res.status(404).json({ message: 'Not found' })
);

app.use('/', (error, req, res, next) => {
	console.log(error);

	return res.status(500).json({ message: 'Error' });
});

// export app only, for testing

export default app;
