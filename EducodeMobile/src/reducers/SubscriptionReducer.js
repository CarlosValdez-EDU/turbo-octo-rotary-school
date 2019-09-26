import {
  SUBSCRIPTION_LOADING,
  SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_FAIL,
  SUBSCRIPTION_RESET,
  CLEAR_STATE
} from "@constants/Types";

const INITIAL_STATE = {
  isLoading: false,
  subscriptionStatus: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUBSCRIPTION_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscriptionStatus: true,
        isLoading: false
      };
    case SUBSCRIPTION_FAIL:
      return {
        ...state,
        subscriptionStatus: false,
        isLoading: false
      };
    case SUBSCRIPTION_RESET:
      return {
        ...state,
        subscriptionStatus: false
      };
    case CLEAR_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
