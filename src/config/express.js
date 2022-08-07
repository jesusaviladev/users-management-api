/* Express app */
import express from 'express';

const app = express();

// handle routes, middlewares...

app.get('/', (req, res) => {
	console.log(req.ip);
	return res.status(200).send('Hello world');
});

// export app only for testing

export default app;
