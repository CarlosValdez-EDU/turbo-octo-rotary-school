import {
    SIGN_UP_USER,
    SIGN_UP_USER_SUCCESS,
    SIGN_UP_USER_FAIL,
    SIGN_UP_FIRSTNAME_CHANGED,
    SIGN_UP_LASTNAME_CHANGED,
    SIGN_UP_USERNAME_CHANGED,
    SIGN_UP_EMAIL_CHANGED,
    SIGN_UP_PASSWORD_CHANGED,
    SIGN_UP_CONFIRM_PASSWORD_CHANGED,
    RESET_ERROR_STATE,
    RESET_SIGNUP,
    SIGNUP_PUBLIC_USER_FAIL,
    RESET_SIGNUP_ERRORS,
    CLEAR_STATE
} from '@constants/Types';

const INITIAL_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    error: undefined,
    loading: false,
    registered: false,
    registerStatus: null,
    isNew: true,
    errorSignup: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_UP_FIRSTNAME_CHANGED:
            return { ...state, firstName: action.payload };
        case SIGN_UP_LASTNAME_CHANGED:
            return { ...state, lastName: action.payload };
        case SIGN_UP_USERNAME_CHANGED:
            return { ...state, username: action.payload };
        case SIGN_UP_EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case SIGN_UP_PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case SIGN_UP_CONFIRM_PASSWORD_CHANGED:
            return { ...state, confirmPassword: action.payload };
        case SIGN_UP_USER:
            return { ...state, loading: true, registerStatus: null, error: undefined };
        case SIGN_UP_USER_SUCCESS:
            return { ...state, registered: true, registerStatus: true, loading: false };
        case SIGN_UP_USER_FAIL:
            return { ...state, loading: false, registerStatus: false, error: action.payload };
        case RESET_ERROR_STATE:
            return { ...state, loading: false, registerStatus: undefined };
        case RESET_SIGNUP:
            return INITIAL_STATE;
        case SIGNUP_PUBLIC_USER_FAIL:
            return { ...state, emailStatus: false, errorSignup: action.payload };
        case RESET_SIGNUP_ERRORS:
            return { ...state, emailStatus: null, errorSignup: '' }
        case CLEAR_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}