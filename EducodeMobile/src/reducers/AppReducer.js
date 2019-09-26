import {
    LOAD_USER_DATA,
    UPDATE_APP_TOKEN,
    UPDATE_APP_LOCALE,
    UPDATE_APP_MODE,
    LOGOUT,
    API_VERSION_STATE
} from "@constants/Types";
import {
    SAVED_USER
} from "@constants/StorageKeys";
const INITIAL_STATE = {
    user: undefined,
    jwt: undefined,
    locale: '',
    appMode: undefined,
    apiVersionstate: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_USER_DATA:
            return {
                ...state,
                user: action.payload
            }
        case SAVED_USER:
            return {
                ...state,
                user: action.payload,
                locale: action.payload.locale || 'en-ca'
            };
        case UPDATE_APP_TOKEN:
            console.log('Update Token', action.payload);
            return {
                ...state,
                jwt: action.payload
            };
        case UPDATE_APP_LOCALE:
            return {
                ...state,
                locale: action.payload
            };
        case UPDATE_APP_MODE:
            return {
                ...state,
                appMode: action.payload
            }
        case LOGOUT:
            return INITIAL_STATE;
        case API_VERSION_STATE:
            return {
                ...state,
                apiVersionstate: action.payload
            }
        default:
            return state;
    }
}