import {
  ENROLL_MORE_INFO__CLASS,
  SUCCESS_MORE_INFO_ENROLLING_CLASS,
  ERROR_MORE_INFO_ENROLLING_CLASS,
  RESET_MORE_INFO_ENROLL_CLASS,
  CLEAR_STATE
} from "@constants/Types";

const INITIAL_STATE = {
  isLoading: false,
  enrolledClass: undefined,
  errorEnrollClass: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ENROLL_MORE_INFO__CLASS:
      return {
        ...state,
        isLoading: true
      };
    case SUCCESS_MORE_INFO_ENROLLING_CLASS:
      return {
        ...state,
        isLoading: false,
        enrolledClass: true
      };
    case ERROR_MORE_INFO_ENROLLING_CLASS:
      return {
        ...state,
        isLoading: false,
        enrolledClass: false,
        errorEnrollClass: action.payload
      };
    case RESET_MORE_INFO_ENROLL_CLASS:
      return INITIAL_STATE;
    case CLEAR_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
