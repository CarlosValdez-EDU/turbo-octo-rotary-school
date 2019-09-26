import {
    UPDATE_USER_PHOTO,
    UPDATE_USER_INFO,
    GET_USER_INFO,
    GET_USER_INFO_FAIL,
    UPDATE_USER_PHOTO_FAIL,
    PROFILE_IS_LOADING,
    PROFILE_FIRSTNAME_CHANGED,
    PROFILE_LASTNAME_CHANGED,
    PROFILE_USERNAME_CHANGED,
    PROFILE_CONFIRM_PASSWORD_CHANGED,
    LOAD_REWARDS,
    PROFILE_PASSWORD_CHANGED,
    PROFILE_CONFIRM_PASSWORD_CHANGED_SUCESS,
    PROFILE_CONFIRM_PASSWORD_CHANGED_FAIL,
    RESET_PROFILE_ERRORS,
    CLEAR_STATE
} from '@constants/Types';

const INITIAL_STATE = {
    username: '',
    firstName: '',
    lastName: '',
    image: undefined,
    error: undefined,
    isLoading: false,
    gift: [],
    rank: '',
    password: '',
    confirmPassword: '',
    passwordStatus: null,
    errorProfile: '',
    licenseeId: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_USER_PHOTO:
            return {
                ...state, 
                image: action.payload
            };
        case UPDATE_USER_INFO:
            return {
                ...state,
                image: action.payload
            };
        case UPDATE_USER_PHOTO_FAIL:
            return {
                ...state,
                error: action.payload.error
            };
        case GET_USER_INFO:
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                username: action.payload.username,
                image: action.payload.image,
                rank: action.payload.rank,
                licenseeId: action.payload.licenseeId,
            };
        case GET_USER_INFO_FAIL:
            return {
                ...state,
                error: action.payload.error
            };
        case PROFILE_FIRSTNAME_CHANGED:
            return { ...state, firstName: action.payload };
        case PROFILE_LASTNAME_CHANGED:
            return { ...state, lastName: action.payload };
        case PROFILE_USERNAME_CHANGED:
            return { ...state, username: action.payload };

        case PROFILE_CONFIRM_PASSWORD_CHANGED:
            return { ...state, confirmPassword: action.payload };

        case PROFILE_PASSWORD_CHANGED:
            return { ...state, passwordStatus: null, password: action.payload };

        case PROFILE_CONFIRM_PASSWORD_CHANGED_SUCESS:
            return { ...state, passwordStatus: true, password: action.payload };

        case PROFILE_CONFIRM_PASSWORD_CHANGED_FAIL:
            return { ...state, passwordStatus: false, password: action.payload };

        case RESET_PROFILE_ERRORS:{
            return { ...state, passwordStatus: null };
        }

        case PROFILE_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case LOAD_REWARDS:
            return {
                ...state,
                gift: action.payload.gift
            }
        case CLEAR_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}