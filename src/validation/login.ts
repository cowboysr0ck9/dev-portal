import Validator from 'validator';
import isEmpty from './is-empty';

// Data Interface
// Data Interface
interface IData {
    email: string;
    password: string;
}

const validateLoginInput = (data: IData) => {
    interface IErrors {
        email?: string;
        password?: string;
    }

    const errors: IErrors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Please fill in an email address.';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Please provide a password.';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Please provide a valid email address.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export default validateLoginInput;
