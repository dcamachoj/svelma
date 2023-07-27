import { writable } from 'svelte/store';
import { i18n } from './i18n.js';
const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export function nop() { }
export class Validator {
    _validate;
    _message;
    constructor(_validate, _message = '*') {
        this._validate = _validate;
        this._message = _message;
    }
    validate(value) {
        return this._validate(value);
    }
    message(value) {
        return typeof this._message === 'function' ? this._message(value) : this._message;
    }
}
export const Val = {
    field: createFieldInputValidator,
    isDirty(...results) {
        return results.some((it) => it.dirty);
    },
    isValid(...results) {
        return !results.find((it) => !it.valid);
    },
    required: (message) => new Validator((v) => v !== undefined && v !== null, message || i18n.toString('validator_required')),
    notEmpty: (message) => new Validator((v) => v !== undefined && v !== null && v !== '', message || i18n.toString('validator_empty')),
    email: (message) => new Validator((v) => v && reEmail.test(v.toString()), message || i18n.toString('validator_email_not_valid')),
    typeOf: (vType, message) => new Validator((v) => v === null || v === undefined || typeof v === vType, message || ((v) => i18n.toString('validator_type_of', { expected: vType, actual: typeof v }))),
    isArray: (message) => new Validator((v) => Array.isArray(v), message || i18n.toString('validator_array')),
    ne: (actual, message) => new Validator((v) => v != actual(), message || ((v) => i18n.toString('validator_ne', { actual: actual() }))),
    gt: (min, message) => new Validator((v) => typeof v !== 'number' || v > min, message || ((v) => i18n.toString('validator_gt', { min }))),
    ge: (min, message) => new Validator((v) => typeof v !== 'number' || v >= min, message || ((v) => i18n.toString('validator_ge', { min }))),
    lt: (max, message) => new Validator((v) => typeof v !== 'number' || v < max, message || ((v) => i18n.toString('validator_lt', { max }))),
    le: (max, message) => new Validator((v) => typeof v !== 'number' || v <= max, message || ((v) => i18n.toString('validator_le', { max }))),
    between: (min, max, message) => new Validator((v) => typeof v !== 'number' || (v >= min && v <= max), message || ((v) => i18n.toString('validator_between', { min, max }))),
    regExp: (re, message) => new Validator((v) => typeof v !== 'string' || re.test(`${v}`), message || i18n.toString('validator_not_valid'))
};
class ValAction {
    _set;
    _validator;
    dirty = false;
    _last;
    node = null;
    constructor(_set, validators) {
        this._set = _set;
        this._validator = buildValidator(validators);
        this.dirtyCheck = this.dirtyCheck.bind(this);
        this.validate = this.validate.bind(this);
        this.update = this.update.bind(this);
        this.setDirty = this.setDirty.bind(this);
    }
    setDirty(value) {
        this.dirty = value;
        this.validate(this._last);
    }
    dirtyCheck(value, dirty) {
        return !dirty && value !== undefined && value !== null;
    }
    validate(value) {
        this._last = value;
        const result = this._validator(value, this.dirty);
        result.value = value;
        this._set(result);
    }
    update(value) {
        if (this.dirtyCheck(value, this.dirty)) {
            this.dirty = true;
        }
        this.validate(value);
    }
}
function createFieldInputValidator(...validators) {
    const { subscribe, set } = writable({
        dirty: false,
        valid: false,
        message: undefined
    });
    const valAction = new ValAction(set, validators);
    function action(node, binding) {
        valAction.node = node;
        valAction.validate(binding);
        return valAction;
    }
    function sInput(node) {
        const input = node.tagName === 'INPUT' ? node : node.querySelector('input');
        input?.addEventListener('input', onChange);
        return {
            destroy() {
                input?.removeEventListener('input', onChange);
            }
        };
        function onChange(e) {
            const value = e.target.value;
            if (input) {
                action(input, value);
            }
        }
    }
    return [
        { subscribe },
        {
            setDirty: valAction.setDirty,
            use: action,
            input: sInput
        }
    ];
}
function buildValidator(validators) {
    return function validate(value, dirty) {
        if (!validators || validators.length === 0) {
            return { dirty, valid: true };
        }
        const failing = validators.find((v) => !v.validate(value));
        return {
            dirty,
            valid: !failing,
            message: failing ? failing.message(value) : undefined
        };
    };
}
