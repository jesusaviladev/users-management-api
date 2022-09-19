/* Express app */
import express from 'express';

/* Routes */
import usersRouter from '../routes/users.routes.js';

const app = express();

// handle routes, middlewares...

app.get('/', (req, res) => {
	return res.status(200).json({
		message: 'Users API',
	});
});

app.use(express.json());

app.use('/api/users', usersRouter);

// export app only, for testing

export default app;
