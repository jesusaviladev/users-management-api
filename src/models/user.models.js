import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
	_id: {
		type: String,
		_id: false,
	},
	name: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 20,
	},
	surname: {
		type: String,
		required: true,
		minLength: 4,
		maxLength: 50,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = userSchema.model('User', userSchema);

export default User;
