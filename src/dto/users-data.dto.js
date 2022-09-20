import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

import { nameDTOSchema, surnameDTOSchema } from '../lib/dto-types.js';

// Creamos el esquema

const UserDataDTOSchema = Type.Object({
	name: nameDTOSchema,
	surname: surnameDTOSchema,
});

// Agregamos formatos para validaciones

const ajv = new Ajv({
	allErrors: true,
})
	.addKeyword('kind')
	.addKeyword('modifier');

addErrors(ajv);

const validateSchema = ajv.compile(UserDataDTOSchema); // función de validacion

// middleware para validar

const validateUserData = (req, res, next) => {
	const isValidSchema = validateSchema(req.body);

	if (!isValidSchema)
		return res.status(400).json({
			errors: validateSchema.errors.map((error) => error.message),
		});

	next();
};

export default validateUserData;
