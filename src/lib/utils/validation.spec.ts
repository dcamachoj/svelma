import { expect, test } from 'vitest';
import {
	valNumber,
	valString,
	valDate,
	valDateTime,
	valTime,
	valBoolean,
	Schema,
} from './validation';
type Role = 'admin' | 'supervisor' | 'operator' | 'client';
type Person = {
	id: number;
	name: string;
	email: string;
	birth: Date;
	married_at?: Date;
	wake_up_time: string;
	admin: boolean;
	children?: number;
	role?: Role;
};
const personSchemaDef = {
	id: valNumber('Id').min(1),
	name: valString('Name', 'Nombre es requerido').required().maxlength(64),
	email: valString('Email', '').required().email(),
	birth: valDate('Date Of Birth').required(),
	married_at: valDateTime('Casado'),
	wake_up_time: valTime('Despertar').required(),
	admin: valBoolean('IS Admin?').required(),
	children: valNumber('Children').min(1),
	role: valString('Role').enum('', 'admin', 'supervisor', 'operator', 'client'),
};
const personSchema = new Schema<Person, typeof personSchemaDef>(personSchemaDef);
function toFormData(src: { [key: string]: any }): FormData {
	const formData = new FormData();
	Object.entries(src).forEach(([key, val]) => {
		formData.append(key, val.toString() || null);
	});
	return formData;
}
test('constraints', () => {
	expect(personSchemaDef.id.constraints).toEqual({
		type: 'number',
		min: 1,
	});
	expect(personSchemaDef.name.constraints).toEqual({
		type: 'text',
		required: true,
		maxlength: 64,
	});
	expect(personSchemaDef.email.constraints).toEqual({
		type: 'email',
		required: true,
	});
	expect(personSchemaDef.birth.constraints).toEqual({
		type: 'date',
		required: true,
	});
	expect(personSchemaDef.married_at.constraints).toEqual({
		type: 'datetime',
	});
	expect(personSchemaDef.wake_up_time.constraints).toEqual({
		type: 'time',
		required: true,
	});
	expect(personSchemaDef.admin.constraints).toEqual({
		type: 'checkbox',
		required: true,
	});
	expect(personSchemaDef.children.constraints).toEqual({
		type: 'number',
		min: 1,
	});
	expect(personSchemaDef.role.constraints).toEqual({
		type: 'text',
		pattern: 'admin|supervisor|operator|client',
	});
});
test('schema empty', () => {
	const [body, errors] = personSchema.fromEntries(toFormData({}));
	expect(body).toEqual({
		id: null,
		name: null,
		email: null,
		birth: null,
		married_at: null,
		wake_up_time: null,
		admin: false,
		children: null,
		role: null,
	});
	expect(errors).toEqual({
		name: ['Name es requerido'],
		email: ['Email es requerido'],
		birth: ['Date Of Birth es requerido'],
		wake_up_time: ['Despertar es requerido'],
		admin: ['IS Admin? es requerido'],
	});
});
test('schema ok', () => {
	const [body, errors] = personSchema.fromEntries(
		toFormData({
			id: 1,
			name: 'Me',
			email: 'a@g.com',
			birth: new Date('1980-02-13'),
			married_at: new Date(2010, 6, 5, 20, 35),
			wake_up_time: '18:30',
			admin: true,
			children: 1,
			role: 'admin',
		} as Person),
	);
	expect(body).toEqual({
		id: 1,
		name: 'Me',
		email: 'a@g.com',
		birth: new Date('1980-02-13'),
		married_at: new Date(2010, 6, 5, 20, 35),
		wake_up_time: '18:30',
		admin: true,
		children: 1,
		role: 'admin',
	});
	expect(errors).toBeNull();
});
test('schema number ok', () => {
	const [body, errors] = personSchema.fromEntries(
		toFormData({
			id: '1',
		}),
	);
	expect(body.id).toEqual(1);
	expect(errors?.id).toEqual(undefined);
});
test('schema number ab', () => {
	const [body, errors] = personSchema.fromEntries(
		toFormData({
			id: 'ab',
		}),
	);
	expect(body.id).toEqual(NaN);
	expect(errors?.id).toEqual(['Id debe ser un número']);
});
test('schema string ok', () => {
	const [body, errors] = personSchema.fromEntries(
		toFormData({
			name: 'Mike',
		}),
	);
	expect(body.name).toEqual('Mike');
	expect(errors?.name).toEqual(undefined);
});
test('schema string maxlength', () => {
	const name = Array.from(new Array(70).keys()).join('x');
	const [body, errors] = personSchema.fromEntries(
		toFormData({
			name,
		}),
	);
	expect(body.name).toEqual(name);
	expect(errors?.name).toEqual(['Longitud de Name no debe ser mayor a 64']);
});
test('schema email not an email', () => {
	const email = 'a';
	const [body, errors] = personSchema.fromEntries(
		toFormData({
			email,
		}),
	);
	expect(body.email).toEqual(email);
	expect(errors?.email).toEqual(['Email debe ser un correo electónico']);
});
