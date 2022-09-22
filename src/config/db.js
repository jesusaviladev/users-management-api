import mongoose from 'mongoose';

const connectDatabase = async (url) => {
	return mongoose
		.connect(url, {
			dbName:
				process.env.NODE_ENV === 'test'
					? process.env.DB_NAME_TEST
					: process.env.DB_NAME,
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
