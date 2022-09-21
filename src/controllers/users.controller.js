import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUser = async (req, res, next) => {
	const { _id, name, surname, email, password } = req.body;

	try {
		const existingUserId = await User.findById(_id);

		if (existingUserId) {
			return res.status(409).json({
				error: 'El id de usuario ya existe',
			});
		}

		const existingUserEmail = await User.findOne({ email });

		if (existingUserEmail) {
			return res.status(409).json({
				error: 'El email ya se encuentra registrado',
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const createdUser = new User({
			_id,
			name,
			surname,
			email,
			password: hashedPassword,
		});

		await createdUser.save();

		return res.status(201).json({
			message: 'Usuario creado correctamente',
		});
	} catch (error) {
		next(error);
	}
};

export const logUser = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const userInDB = await User.findOne({ email });

		if (!userInDB) {
			return res.status(401).json({
				error: 'Usuario o contraseña inválidos',
			});
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			userInDB.password
		);

		if (!isPasswordValid) {
			return res.status(401).json({
				error: 'Usuario o contraseña inválidos',
			});
		}

		const payload = {
			id: userInDB._id,
		};

		const signedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: '7d',
		});

		return res.status(200).json({
			token: signedToken,
		});
	} catch (error) {
		next(error);
	}
};

export const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const getUserData = async (req, res, next) => {
	const { userId } = req;

	try {
		const user = await User.findById(userId);

		if (!user)
			return res.status(401).json({
				error: 'Unauthorized',
			});

		const { _id, name, surname, email } = user;

		return res.status(200).json({
			_id,
			name,
			surname,
			email,
		});
	} catch (error) {
		next(error);
	}
};

export const editUser = (req, res) => {
	return res.status(200).json({
		message: 'patch success',
	});
};

export const resetUserPassword = (req, res) => {
	return res.status(200).json({
		message: 'patch success',
	});
};

export const resetUserEmail = (req, res) => {
	return res.status(200).json({
		message: 'patch success',
	});
};

export const deleteUser = (req, res) => {
	return res.status(200).json({
		message: 'delete success',
	});
};
