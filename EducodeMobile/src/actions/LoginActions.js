import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  LOGIN_EMAIL_CHANGED,
  LOGIN_PASSWORD_CHANGED,
  FORGOT_PASSWORD_CHANGED,
  RESET_FORGOT_PASSWORD_ERRORS,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  RESET_INFO,
  SHOW_FEATURES as SHOWFEATURES_TYPE,
  LOAD_USER_DATA,
  SEND_EMAIL_FAIL,
  UPDATE_APP_LOCALE,
  SAVE_TROUBLED_EMAIL,
  API_VERSION_STATE,
  IS_LOGIN_LODING,
  UPDATE_APP_MODE
} from "@constants/Types";
import {
  SINGLE_USER_LICENSEE,
  FORGOT_PASSWORD,
  LOGIN,
  VALIDATE_JWT,
  ADMIN_USER,
  GOD_MODE
} from "@constants/AppConstants";
import { SAVED_USER, SHOW_FEATURES } from "@constants/StorageKeys";
import { readFrom } from "@data/local/LocalRepository";
import { saveCredentials } from "../TokenManager";
import _ from "lodash";
import { saveUser } from "@data/local/UserRepository";
import { logLogin } from "@data/local/LoginLogRepository";
import { initAppData } from "@data/local/AppRepository";
import { verifyAPIVersion, updateUserLanguage, verifySubscription } from "./AppActions";

export const emailChanged = text => {
  return {
    type: LOGIN_EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: LOGIN_PASSWORD_CHANGED,
    payload: text
  };
};

export const resetPasswordChanged = text => {
  return {
    type: FORGOT_PASSWORD_CHANGED,
    payload: text
  };
};

export const sendEmail = email => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = {
          username: email
        };

        await dispatch(sendCommand(FORGOT_PASSWORD, data));

        dispatch({
          type: SEND_EMAIL_SUCCESS
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: SEND_EMAIL_FAIL,
          payload: error
        });
      } finally {
        resolve();
      }
    });
  };
};

export const resetForgotPasswordErrors = () => {
  return {
    type: RESET_FORGOT_PASSWORD_ERRORS
  };
};

export const resetEmail = email => {
  return dispatch => {
    dispatch({ type: SEND_EMAIL });
  };
};

export const sendError = errorType => {
  return {
    type: LOGIN_USER_FAIL,
    payload: errorType
  };
};

export const resetInitialState = () => {
  return {
    type: RESET_INFO
  };
};

export const setNewFeaturesComponentWatchable = async () => {
  let savedElement = await readFrom(SHOW_FEATURES);
  return {
    type: SHOWFEATURES_TYPE
  };
};

export const login = (username, password, platform) => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: LOGIN_USER
        });

        let isUpdatedRequired = await dispatch(verifyAPIVersion());

        if (isUpdatedRequired == false) {
          initAppData();

          let data = { username, password, platform: "mobile" };
          console.log(data);
          let userInfo = await dispatch(sendCommand(LOGIN, data));

          if (userInfo.licensee) {
            userInfo.licenseeId = _.get(userInfo, ["licensee", "_id"]);
          }

          if (userInfo._id === ADMIN_USER) {
            dispatch({
              type: UPDATE_APP_MODE,
              payload: GOD_MODE
            });
          }

          saveCredentials(username, password);
          saveUser(userInfo);
          await dispatch(verifySubscription());
          logLogin(userInfo);

          dispatch({
            type: LOAD_USER_DATA,
            payload: userInfo
          });

          if (userInfo.locale) {
            //dispatch(updateUserLanguage(userInfo.locale));
            dispatch(updateUserLanguage('en-CA'));
          }

          dispatch({
            type: LOGIN_USER_SUCCESS
          });
        } else {
          dispatch({
            type: API_VERSION_STATE,
            payload: isUpdatedRequired
          });
        }

      } catch (error) {
        debugger;
        console.log(error);

        dispatch({
          type: LOGIN_USER_FAIL,
          payload: error
        });
      }
    });
  };
};

export const rawLogin = (username, password) => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = { username, password, platform: "1" };
        let userInfo = await dispatch(sendCommand(LOGIN, data));

        if (userInfo.licensee) {
          userInfo.licenseeId = _.get(userInfo, ["licensee", "_id"]);
        }

        dispatch({
          type: LOAD_USER_DATA,
          payload: userInfo
        });
      } catch (error) {
        console.log(error);
      } finally {
        resolve();
      }

    });
  };
};

export const validateJWT = (username, password, jwt) => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let datajwt = { jwt };
        await dispatch(sendCommand(VALIDATE_JWT, datajwt));
      } catch (error) {
        if (error === "invalidJWT") {
          let data = { username, password, platform: '1' };
          let userInfo = await dispatch(sendCommand(LOGIN, data));

          if (userInfo.licensee) {
            userInfo.licenseeId = _.get(userInfo, ["licensee", "_id"]);
          }

          dispatch({
            type: LOAD_USER_DATA,
            payload: userInfo
          });

          resolve("invalidJWT")
        }
        console.log(error);
      } finally {
        resolve();
      }
    });
  };
};

export const saveFailedEmail = (failedEmail) => {
  return {
    type: SAVE_TROUBLED_EMAIL,
    payload: failedEmail
  };
};

function sendTokenCommand(command, params = undefined, timeout = 30000) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(Socket.sendCommand(command, params, timeout))
        .then(resolve)
        .catch(reject);
    });
  };
}

export const clearLoadingState = () => {
  return ({
    type: IS_LOGIN_LODING
  })
}