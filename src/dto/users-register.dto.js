import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

import {
	idDTOSchema,
	nameDTOSchema,
	surnameDTOSchema,
	emailDTOSchema,
	passwordDTOSchema,
} from './dto-types.js';

// Creamos el esquema

const RegisterDTOSchema = Type.Object(
	{
		_id: idDTOSchema,
		name: nameDTOSchema,
		surname: surnameDTOSchema,
		email: emailDTOSchema,
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

addFormats(ajv, ['uuid', 'email']);

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

addErrors(ajv);

const validateSchema = ajv.compile(RegisterDTOSchema); // función de validacion

// middleware para validar

const validateUserRegister = (req, res, next) => {
	const isValidSchema = validateSchema(req.body);

	if (!isValidSchema)
		return res.status(400).json({
			errors: validateSchema.errors.map((error) => error.message),
		});

	next();
};

export default validateUserRegister;
