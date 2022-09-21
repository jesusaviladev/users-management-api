import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

import { passwordDTOSchema } from '../lib/dto-types.js';

// Creamos el esquema

const UnregisterUserDTOSchema = Type.Object(
	{
		password: passwordDTOSchema,
	},
	{
		additionalProperties: false,
		errorMessage: {
			additionalProperties: 'El formato del objeto no es válido',
		},
	}
);

// Agregamos formatos para validaciones

const ajv = new Ajv({
	allErrors: true,
})
	.addKeyword('kind')
	.addKeyword('modifier');

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

addErrors(ajv);

const validateSchema = ajv.compile(UnregisterUserDTOSchema); // función de validacion

// middleware para validar

const validateUserUnregister = (req, res, next) => {
	const isValidSchema = validateSchema(req.body);

	if (!isValidSchema)
		return res.status(400).json({
			errors: validateSchema.errors.map((error) => error.message),
		});

	next();
};

export default validateUserUnregister;
