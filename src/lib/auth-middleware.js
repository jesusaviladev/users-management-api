import jwt from 'jsonwebtoken';

const validateAuth = (req, res, next) => {
	const { authorization } = req.headers;

	let token = '';

	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		token = authorization.substring(7);
	}

	if (!token) {
		return res.status(401).json({
			error: 'Unauthorized, missing or invalid identifier',
		});
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

		req.userId = decodedToken.id;

		next();
	} catch (error) {
		return res.status(401).json({
			error: 'Unauthorized',
		});
	}
};

export default validateAuth;
