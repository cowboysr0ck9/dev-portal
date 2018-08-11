import Validator from 'validator';
import isEmpty from './is-empty';

// Data Interface
interface IData {
    title: string;
    company: string;
    from: string;
}

const validateExperienceInput = (data: IData) => {
    interface IErrors {
        title?: string;
        company?: string;
        from?: string;
        noprofiles?: string;
    }

    const errors: IErrors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    // Checks Input Field Emptiness
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Please provide a job title';
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Please provide a company name.';
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

export default validateExperienceInput;
