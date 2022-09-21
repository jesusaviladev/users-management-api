import mongoose from 'mongoose';

const connectDatabase = async (url) => {
	return mongoose
		.connect(url, {
			dbName: 'users-management-api',
		})
		.then(() => {
			console.log('Database connected');
		})
		.catch((err) => {
			console.log(err.message);
			process.exit(1);
		});
};

export default connectDatabase;
