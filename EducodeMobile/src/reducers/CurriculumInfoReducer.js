import {
  SET_CLASS_INTERFACE_DATA,
  CURRICULUMINFO_IS_LOADING,
  CLEAR_STATE
} from '@constants/Types';

const INITIAL_STATE = {
  curriculumData: {},
  isLoading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CLASS_INTERFACE_DATA:
      return {
        ...state,
        curriculumData: action.payload
      }
    case CURRICULUMINFO_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case CLEAR_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
}