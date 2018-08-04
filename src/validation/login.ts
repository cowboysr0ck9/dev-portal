import validator from 'validator';
import isEmpty from './is-empty';

// Data Interface
interface IData {
    email: string;
    password: string;
}

const validateLoginInput = (data: IData) => {
    // Dynamically Populated Erros Object
    let errors = {
        email: '',
        password: '',
    };

    // Ensure only strings are being checked
    data.email = !isEmpty(data) ? data.email : '';
    data.password = !isEmpty(data) ? data.password : '';

    // Checks and Validates Register Fields
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password';
    }
    if (validator.isLength(data.password, { min: 6, max: 16 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export default validateLoginInput;
