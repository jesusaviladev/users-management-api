import app from '../config/express.js';
import connectDatabase from '../config/db.js';
import '../config/env.js';
import User from '../models/user.models.js';
import request from 'supertest';
import test from 'ava';

import { testUser } from '../mock-data.js';

let token = '';

test.before(async (t) => {
	await connectDatabase(process.env.MONGODB_URL);
});

test.serial('la aplicación debe iniciar correctamente', async (t) => {
	const response = await request(app).get('/');

	t.is(response.status, 200);
	t.is(response.ok, true);
});

test.serial('debe poder registrar un usuario correctamente', async (t) => {
	const response = await request(app)
		.post('/api/users/register')
		.send(testUser);

	t.is(response.status, 201);
	t.is(response.ok, true);
	t.is(response.body.message, 'Usuario creado correctamente');
});

test.serial('debe poder iniciar sesión', async (t) => {
	const response = await request(app)
		.post('/api/users/login')
		.send({ email: 'avijesus13@gmail.com', password: 'Test123456' });

	t.is(response.status, 200);
	t.is(response.ok, true);
	t.truthy(response.body.token);

	token = response.body.token;
});

test('no debe registrar un usuario ya existente', async (t) => {
	const response = await request(app)
		.post('/api/users/register')
		.send(testUser);

	t.is(response.status, 409);
	t.is(response.ok, false);
	t.is(response.body.error, 'El id de usuario ya existe');
});

test('debe poder recuperar los datos del usuario', async (t) => {
	const response = await request(app)
		.get('/api/users/profile')
		.set('Authorization', `Bearer ${token}`);

	t.is(response.status, 200);
	t.is(response.ok, true);
	t.is(response.body._id, testUser._id);
});

test('debe poder actualizar los datos del usuario', async (t) => {
	const response = await request(app)
		.patch('/api/users/')
		.set('Authorization', `Bearer ${token}`)
		.send({
			name: 'Manuel',
			surname: 'Pepito',
		});

	const user = await User.findById(testUser._id);

	t.is(response.status, 200);
	t.is(response.ok, true);
	t.is(response.body.message, 'Usuario actualizado');

	t.is(user.surname, 'Pepito');
});

test.serial('debe poder actualizar el email del usuario', async (t) => {
	const response = await request(app)
		.patch('/api/users/update-email')
		.set('Authorization', `Bearer ${token}`)
		.send({
			email: 'test@mail.com',
			password: 'Test123456',
		});

	const user = await User.findById(testUser._id);

	t.is(response.status, 200);
	t.is(response.ok, true);
	t.is(response.body.message, 'Email del usuario actualizado');

	t.is(user.email, 'test@mail.com');
});

test.serial('debe poder actualizar la contraseña del usuario', async (t) => {
	const response = await request(app)
		.patch('/api/users/reset-password')
		.set('Authorization', `Bearer ${token}`)
		.send({
			oldPassword: 'Test123456',
			newPassword: 'Pepit0123456',
		});

	t.is(response.status, 200);
	t.is(response.ok, true);
	t.is(response.body.message, 'Contraseña actualizada');

	const login = await request(app)
		.post('/api/users/login')
		.send({
			email: 'test@mail.com',
			password: 'Pepit0123456',
		})
		.expect(200);
});

test.after.always(async (t) => {
	await User.deleteMany({});
});
