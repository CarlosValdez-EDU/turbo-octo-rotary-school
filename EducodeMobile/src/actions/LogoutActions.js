import {
  LOGOUT
} from '@constants/Types';
import deleteAll from "@data/local/LocalRepository";

export const logoutAndDestroySession = () => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {

      await deleteAll();

      dispatch({ type: LOGOUT });
    });
  };
};