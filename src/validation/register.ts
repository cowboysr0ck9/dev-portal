import validator from 'validator';
import isEmpty from './is-empty';

// Data Interface
interface IData {
    username: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const validateRegisterInput = (data: IData) => {
    // Dynamically Populated Erros Object
    let errors = {
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    // Ensure only strings are being checked
    data.username = !isEmpty(data) ? data.username : '';
    data.name = !isEmpty(data) ? data.name : '';
    data.email = !isEmpty(data) ? data.email : '';
    data.password = !isEmpty(data) ? data.password : '';
    data.confirmPassword = !isEmpty(data) ? data.confirmPassword : '';

    // Checks and Validates Register Fields
    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters.';
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

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

    if (validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Please confirm your password your';
    }

    if (validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords must match one another';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export default validateRegisterInput;
