import { Type } from '@sinclair/typebox';

export const idDTOSchema = Type.String({
	format: 'uuid',
	errorMessage: {
		type: 'El tipo de _id no es válido, debe ser un string',
		format: 'El formato de _id no es válido, debe ser un uuidv4',
	},
});

export const nameDTOSchema = Type.String({
	minLength: 2,
	maxLength: 20,
	errorMessage: {
		minLength: 'El nombre debe tener mínimo 2 caracteres de longitud',
		maxLength: 'El nombre debe tener como máximo 20 caracteres de longitud',
	},
});

export const surnameDTOSchema = Type.String({
	minLength: 4,
	maxLength: 50,
	errorMessage: {
		minLength: 'El apellido debe tener mínimo 4 caracteres de longitud',
		maxLength:
			'El apellido debe tener como máximo 50 caracteres de longitud',
	},
});

export const emailDTOSchema = Type.String({
	format: 'email',
	errorMessage: {
		type: 'El tipo de email no es válido, debe ser un string',
		format: 'El formato de email no es válido, debe ser un email',
	},
});

export const passwordDTOSchema = Type.String({
	format: 'password', // custom validation
	minLength: 10,
	maxLength: 25,
	errorMessage: {
		type: 'El tipo de la contraseña no es válido, debe ser un string',
		format: 'El formato de la contraseña no es válido',
		minLength: 'La contraseña debe tener mínimo 10 caracteres de longitud',
		maxLength:
			'La contraseña debe tener como máximo 20 caracteres de longitud',
	},
});
