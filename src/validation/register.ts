import Validator from 'validator';
import isEmpty from './is-empty';

// Data Interface
interface IData {
    username: string;
    name: string;
    email: string;
    password: string;
    password2: string;
}

const validateRegisterInput = (data: IData) => {
    interface IErrors {
        name?: string;
        email?: string;
        password?: string;
        password2?: string;
    }

    const errors: IErrors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    // check empty
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Please provide your name.';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Please fill in an email address.';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Please provide a password.';
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Please confirm your password.';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password = 'Password does not match.';
        errors.password2 = 'Password does not match.';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Please provide a valid email address.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export default validateRegisterInput;
