import Validator from 'validator';
import isEmpty from './is-empty';

// Data Interface
interface IData {
    school: string;
    degree: string;
    studied: string;
    from: string;
}

const validateEducationInput = (data: IData) => {
    interface IErrors {
        school?: string;
        degree?: string;
        studied?: string;
        from?: string;
        error?: string;
    }

    const errors: IErrors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.studied = !isEmpty(data.studied) ? data.studied : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    // Checks Input Field Emptiness
    if (Validator.isEmpty(data.school)) {
        errors.school = 'Please provide a job title';
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Please provide a job title';
    }

    if (Validator.isEmpty(data.studied)) {
        errors.studied = 'Please provide a company name.';
    }

    if (Validator.isEmpty(data.from)) {
        errors.from =
            'Please provide a date from when you started your posistion.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export default validateEducationInput;
