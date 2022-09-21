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

export const editUser = async (req, res, next) => {
	const { userId } = req;

	const { name, surname } = req.body;

	try {
		const user = await User.findById(userId);

		if (!user)
			return res.status(401).json({
				error: 'Invalid user',
			});

		user.name = name;
		user.surname = surname;

		await user.save();

		return res.status(200).json({
			message: 'Usuario actualizado',
		});
	} catch (error) {
		next(error);
	}
};

export const resetUserPassword = async (req, res, next) => {
	const { userId } = req;

	const { oldPassword, newPassword } = req.body;

	try {
		const user = await User.findById(userId);

		if (!user)
			return res.status(401).json({
				error: 'Invalid user',
			});

		const isPasswordValid = await bcrypt.compare(
			oldPassword,
			user.password
		);

		if (!isPasswordValid)
			return res.status(401).json({
				error: 'Invalid user credentials',
			});

		const newHashedPassword = await bcrypt.hash(newPassword, 10);

		user.password = newHashedPassword;

		await user.save();

		return res.status(200).json({
			message: 'Contraseña actualizada',
		});
	} catch (error) {
		next(error);
	}
};

export const resetUserEmail = async (req, res, next) => {
	const { userId } = req;

	const { email, password } = req.body;

	try {
		const user = await User.findById(userId);

		if (!user)
			return res.status(401).json({
				error: 'Invalid user',
			});

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid)
			return res.status(401).json({
				error: 'Invalid user credentials',
			});

		user.email = email;

		await user.save();

		return res.status(200).json({
			message: 'Email del usuario actualizado',
		});
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	const { userId } = req;

	const { password } = req.body;

	try {
		const user = await User.findById(userId);

		if (!user)
			return res.status(404).json({
				error: 'Invalid user',
			});

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid)
			return res.status(401).json({
				error: 'Usuario no autorizado',
			});

		await User.deleteOne();

		return res.status(204).json({
			message: 'Usuario eliminado',
		});
	} catch (error) {
		next(error);
	}
};
