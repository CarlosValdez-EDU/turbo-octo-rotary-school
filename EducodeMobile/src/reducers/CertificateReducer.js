import {
    IS_LOADING_CERTIFICATE,
    SHOW_CERTIFICATE,
    CLEAR_CERTIFICATE_DATA
} from '@constants/Types';

const INITIAL_STATE = {
    isLoadingCertificate: true,
    certificateData: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case IS_LOADING_CERTIFICATE:
            return {
                ...state, 
                isLoadingCertificate: action.payload
            }
        case SHOW_CERTIFICATE:
            return {
                ...state,
                certificateData: action.payload
            }
        case CLEAR_CERTIFICATE_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
}