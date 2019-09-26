import _ from 'lodash';
import {
    SET_LOCALE,
    VALIDATE_USER_PAYMENT,
    TRIAL_MODE,
    FULL_MODE,
    GET_API_VERSION,
    ADMIN_USER,
    GOD_MODE
} from '@constants/AppConstants';
import {
    UPDATE_APP_LOCALE,
    UPDATE_APP_TOKEN,
    UPDATE_APP_MODE,
    CLEAR_STATE,
    LOGOUT,
    API_VERSION_STATE,
} from '@constants/Types'
import {
    initAppData,
    getAppData,
    updateAppData
} from '@data/local/AppRepository';
import { getCurrentUser, updateUser, deleteUserSession } from '@data/local/UserRepository';
import { savePurchase, getCurrentPaymentInfo } from '@data/local/PaymentRepository';
import { setLocale } from 'react-native-redux-i18n';
import { clearAppData } from "@data/local/AppRepository";
import { deleteInfo } from '../TokenManager';
import { deletePaymentInfo } from '@data/local/PaymentRepository';
// import { validateAPIVersion } from '@data/local/validateAPIVersion';
import { View } from 'native-base';

export const updateUserLanguage = (locale) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch({
                    type: UPDATE_APP_LOCALE,
                    payload: locale
                });

                dispatch(setLocale(locale));

                let currentUser = getCurrentUser();
                currentUser.locale = locale;
                updateUser(currentUser);

                let data = { locale }
                await dispatch(sendCommand(SET_LOCALE, data));
            } catch (error) {
                console.log(error);
                resolve();
            }
        });
    }
}

export const updateAppToken = (token) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                let appData = await getAppData();

                // if (!appData) { await initAppData() }

                if (appData) {
                    appData.token = token;
                    updateAppData(appData);

                    dispatch({
                        type: UPDATE_APP_TOKEN,
                        payload: token
                    });

                    resolve();
                }
                resolve();
            } catch (error) {
                console.log('Error updating token', error);
                debugger;
                resolve();
            }
        });
    }
}

export const updateAppMode = (appMode) => {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch({
                    type: UPDATE_APP_MODE,
                    payload: appMode
                });

                let appData = await getAppData();
                appData.appMode = appMode;

                updateAppData(appData);
            } catch (error) {
                console.log(error);

                resolve();
            }

            resolve();
        });
    }
}

export const verifySubscription = () => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            let paymentInfo = getCurrentPaymentInfo();
            let currentUser = getCurrentUser();

            try {
                if (!currentUser) resolve();

                if (currentUser._id === ADMIN_USER) {
                    dispatch({
                        type: UPDATE_APP_MODE,
                        payload: GOD_MODE
                    });

                    resolve();
                }

                let data = {
                    userId: currentUser._id,
                }

                let response = await dispatch(sendCommand(VALIDATE_USER_PAYMENT, data));

                if (!_.isNull(response)) {
                    await savePurchase({
                        _id: paymentInfo ? paymentInfo._id : undefined,
                        purchase: _.get(response, ['token']),
                        isActive: String(_.get(response, ['enabled'])),
                        platform: String(_.get(response, ['platformId']))
                    });


                    let liceseeActive = _.get(response, ['enabled']);
                    if (liceseeActive == true) {
                        dispatch(updateAppMode(FULL_MODE));
                    } else {
                        dispatch(updateAppMode(TRIAL_MODE));
                    }

                }

                resolve();

            } catch (error) {
                console.log('Error licensee manager --------------->', error);

                if (currentUser._id !== ADMIN_USER) {
                    if (error === 'paymentNotFound') {
                        if (paymentInfo) {
                            paymentInfo.isActive = undefined;
                            await savePurchase(paymentInfo);
                        } else {
                            await savePurchase({});
                        }
                    }
                    if (paymentInfo) {
                        if (paymentInfo.isActive == true) {
                            dispatch(updateAppMode(FULL_MODE));
                        } else {
                            dispatch(updateAppMode(TRIAL_MODE));
                        }
                    } else {
                        dispatch(updateAppMode(TRIAL_MODE));
                    }
                } else {
                    dispatch({
                        type: UPDATE_APP_MODE,
                        payload: GOD_MODE
                    });
                }

                resolve();
            }
        })
    }
}

export const userLogout = (locale) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                deleteUserSession();
                clearAppData();
                deleteInfo();
                deletePaymentInfo();

                dispatch({
                    type: CLEAR_STATE
                });

                dispatch({
                    type: LOGOUT
                });
            } catch (error) {
                console.log(error);
                debugger;
                resolve();
            }
        });
    }
}

export const verifyAPIVersion = () => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                let apiVersionState = false
                const currentVersion = require("@utils/api_version.json");
                let apiVersion = await dispatch(sendCommand(GET_API_VERSION));

                (currentVersion.APIVersion != parseFloat(apiVersion)) ? apiVersionState = true : apiVersionState = false;


                dispatch({
                    type: API_VERSION_STATE,
                    payload: apiVersionState
                });


                if (apiVersionState) {
                    if (getState().app.user) {
                        //verifies if the user is logged in
                        dispatch(userLogout());
                    }
                }

                resolve(apiVersionState);

            } catch (error) {
                console.log(error);
                resolve();
                debugger;
            }
        });
    }
}

export const clearUpdateNeededState = () => {
    return ({
        type: API_VERSION_STATE,
        payload: false
    });
}