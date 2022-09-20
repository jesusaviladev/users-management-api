export const getUsers = (req, res, next) => {
	return res.status(200).json({
		message: 'get',
	});
};

export const getUserData = (req, res) => {
	return res.status(200).json({
		message: 'get success',
	});
};

export const createUser = (req, res) => {
	return res.status(201).json({
		message: 'created',
	});
};

export const logUser = (req, res) => {
	return res.status(200).json({
		message: 'login',
	});
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
