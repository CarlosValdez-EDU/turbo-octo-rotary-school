import validation from 'validate.js'
import Loc from '@components/common/Loc/Loc';

export default function validate(fieldName, value) {
    var constraints = {
        email: {
            presence: true,
            format: {
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: '^' + Loc.getInstance().TextFor('common.emailValidationError'),
                max: 50,
            }
        },
        password: {
            presence: true,
            length: {
                minimum: 1,
                message: '^' + Loc.getInstance().TextFor('common.passwordValidatorError'),
                maximum: 50
            }
        },
        confirmPassword: {
            presence: true,
            equality: {
                attribute: "password",
                message: '^' + Loc.getInstance().TextFor('common.confirmPasswordError'),
                comparator: function (fieldName) {
                    return JSON.stringify(fieldName.password) === JSON.stringify(fieldName.confirmPassword);
                }
            }
        },
        empty: {
            presence: true,
            length: {
                minimum: 1,
                message: '^' + Loc.getInstance().TextFor('common.emptyValue'),
                maximum: 50
            }
        }
    };

    var formValues = {}
    formValues[fieldName] = value

    var formFields = {}
    formFields[fieldName] = constraints[fieldName]

    const result = validation(formValues, formFields)

    if (result) {
        return result[fieldName][0]
    }
    return null
}