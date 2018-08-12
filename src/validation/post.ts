import Validator from 'validator';
import isEmpty from './is-empty';

// Data Interface
interface IData {
    text: string;
}

interface IErrors {
    text?: string;
}

const validatePostInput = (data: IData) => {
    const errors: IErrors = {};

    // Ensures only strings are being validated against by Validator.JS
    data.text = !isEmpty(data.text) ? data.text : '';

    // Ensures comments don't exceed specified length
    if (!Validator.isLength(data.text, { min: 10, max: 180 })) {
        errors.text = 'Text field does not meet length requirements.';
    }

    // Checks to see if the comment is empty or not
    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is requred on all comments.';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export default validatePostInput;
