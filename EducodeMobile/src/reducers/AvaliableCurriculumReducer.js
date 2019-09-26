import {
    ENROLL_CLASS,
    SUCCESS_ENROLLING_CLASS,
    ERROR_ENROLLING_CLASS,
    RESET_ENROLL_CLASS,
    CLEAR_STATE
} from '@constants/Types';

const INITIAL_STATE = {
    isLoading: false,
    enrolledClass: undefined,
    errorEnrollClass: undefined
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ENROLL_CLASS:
            return {
                ...state,
                isLoading: true
            }
        case SUCCESS_ENROLLING_CLASS:
            return {
                ...state,
                isLoading: false,
                enrolledClass: true
            }
        case ERROR_ENROLLING_CLASS:
            return {
                ...state,
                isLoading: false,
                enrolledClass: false,
                errorEnrollClass: action.payload
            }
        case RESET_ENROLL_CLASS:
            return INITIAL_STATE;
        case CLEAR_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}