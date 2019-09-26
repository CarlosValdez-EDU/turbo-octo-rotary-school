import _ from 'lodash';
import {
    SIGN_UP_USER,
    SIGN_UP_USER_SUCCESS,
    SIGN_UP_USER_FAIL,
    SIGN_UP_EMAIL_CHANGED,
    SIGN_UP_PASSWORD_CHANGED,
    SIGN_UP_CONFIRM_PASSWORD_CHANGED,
    RESET_SIGNUP,
    RESET_ERROR_STATE,
    RESET_SIGNUP_ERRORS,
    LOAD_USER_DATA,
    UPDATE_APP_LOCALE
} from "@constants/Types";
import { logLogin } from '@data/local/LoginLogRepository';
import { verifySubscription } from './AppActions';
import { saveCredentials, renewToken } from '../TokenManager';
import {
    SAVE_PUBLIC_USER
} from '@constants/AppConstants';
import Socket from '@data/remote/socket_client/Socket';
import { saveUser } from '@data/local/UserRepository';
import { initAppData } from '@data/local/AppRepository';
import DeviceInfo from 'react-native-device-info';

export const signupEmailChanged = (text) => {
    return {
        type: SIGN_UP_EMAIL_CHANGED,
        payload: text
    };
};

export const signupPasswordChanged = (text) => {
    return {
        type: SIGN_UP_PASSWORD_CHANGED,
        payload: text
    };
};

export const signupConfirmPasswordChanged = (text) => {
    return {
        type: SIGN_UP_CONFIRM_PASSWORD_CHANGED,
        payload: text
    };
};

export const showError = errorType => {
    return {
        type: SIGN_UP_USER_FAIL,
        payload: errorType
    };
}

export const resetSignup = () => {
    return ({
        type: RESET_SIGNUP
    });
}

export const resetSignupErrors = () => {
    return ({
        type: RESET_SIGNUP_ERRORS
    })
}

export const signup = (email, password, type, username = email) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch({
                    type: SIGN_UP_USER
                });

                const uniqueId = DeviceInfo.getUniqueID();
                let data = { username, password, type: 'spu', deviceId: uniqueId, platform: "mobile" };
                let userInfo = await dispatch(sendCommand(SAVE_PUBLIC_USER, data));

                if (userInfo.licensee) {
                    userInfo.licenseeId = _.get(userInfo, ['licensee', '_id']);
                }

                await initAppData();
                saveCredentials(email, password);
                saveUser(userInfo);
                await dispatch(verifySubscription());
                logLogin(userInfo);

                dispatch({
                    type: LOAD_USER_DATA,
                    payload: userInfo
                });

                dispatch({
                    type: UPDATE_APP_LOCALE,
                    payload: 'en-CA'
                });

                dispatch({
                    type: SIGN_UP_USER_SUCCESS
                });
            } catch (error) {
                console.log(error);
            } finally {
                resolve();
            }

        });
    }
}

export const resetErrorState = () => {
    return {
        type: RESET_ERROR_STATE
    }
}

function sendCommand(command, params = undefined, timeout = 30000) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(Socket.sendCommand(command, params, timeout)).then(resolve)
                .catch(reject => {
                    dispatch({
                        type: SIGN_UP_USER_FAIL,
                        payload: reject
                    })
                });
        });
    }
}