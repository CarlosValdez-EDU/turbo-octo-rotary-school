import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAIL,
  LOGIN_EMAIL_CHANGED,
  LOGIN_PASSWORD_CHANGED,
  FORGOT_PASSWORD_CHANGED,
  RESET_FORGOT_PASSWORD_ERRORS,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  SHOW_FEATURES,
  RESET_INFO,
  CLEAR_STATE,
  SAVE_TROUBLED_EMAIL,
  IS_LOGIN_LODING
} from "@constants/Types";

const INITIAL_STATE = {
  emailStatus: null,
  email: "",
  password: "",
  emailResetPassword: "",
  error: undefined,
  errorForgotPassword: "",
  loading: false,
  logedin: false,
  showAlert: false,
  troubledEmail: "",
  savedTroubledEmail: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_EMAIL_CHANGED:
      return { ...state, email: action.payload, emailResetPassword: action.payload };
    case LOGIN_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case FORGOT_PASSWORD_CHANGED:
      return { ...state, emailResetPassword: action.payload, email: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: undefined };
    case LOGIN_USER_SUCCESS:
      return { ...INITIAL_STATE, logedin: true };
    case LOGIN_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SEND_EMAIL:
      return { ...state, emailStatus: null };
    case SEND_EMAIL_SUCCESS:
      return { ...state, emailStatus: true };
    case SEND_EMAIL_FAIL:
      return { ...state, emailStatus: false, errorForgotPassword: action.payload };
    case LOGOUT:
      return INITIAL_STATE;
    case RESET_FORGOT_PASSWORD_ERRORS:
      return { ...state, emailStatus: null, errorForgotPassword: "" };
    case SAVE_TROUBLED_EMAIL:
      return { ...state, troubledEmail: action.payload, savedTroubledEmail: true };
    case IS_LOGIN_LODING:
      return {
        ...state,
        loading: false
      }
    case RESET_INFO:
      return INITIAL_STATE;
    case SHOW_FEATURES:
      return null;
    case CLEAR_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
