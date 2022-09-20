import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

import { emailDTOSchema, passwordDTOSchema } from '../lib/dto-types.js';

// Creamos el esquema

const UpdateEmailDTOSchema = Type.Object({
	email: emailDTOSchema,
	password: passwordDTOSchema,
});

// Agregamos formatos para validaciones

const ajv = new Ajv({
	allErrors: true,
})
	.addKeyword('kind')
	.addKeyword('modifier');

addFormats(ajv, ['email']);

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

addErrors(ajv);

const validateSchema = ajv.compile(UpdateEmailDTOSchema); // función de validacion

// middleware para validar

const validateUserEmail = (req, res, next) => {
	const isValidSchema = validateSchema(req.body);

	if (!isValidSchema)
		return res.status(400).json({
			errors: validateSchema.errors.map((error) => error.message),
		});

	next();
};

export default validateUserEmail;
