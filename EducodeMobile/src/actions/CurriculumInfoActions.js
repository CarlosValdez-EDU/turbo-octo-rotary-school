import {
  SET_CLASS_INTERFACE_DATA,
  CURRICULUMINFO_IS_LOADING
} from '@constants/Types';
import Socket from '@data/remote/socket_client/Socket';
import { normalizeData } from '@utils/DataNormalizer';

export const getClassInterfaceData = (teacherMode, userId, _id) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch({
        type: CURRICULUMINFO_IS_LOADING,
        payload: true
      });

      let data = { teacherMode, userId, _id };
      let classInfo = await dispatch(sendCommand('getClassInterfaceData', data));
      let finalData = normalizeData(classInfo);

      dispatch({
        type: SET_CLASS_INTERFACE_DATA,
        payload: finalData
      });

      dispatch({
        type: CURRICULUMINFO_IS_LOADING,
        payload: false
      });

    });
  }
};

function sendCommand(command, params = undefined, timeout = 30000) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(Socket.sendCommand(command, params, timeout)).then(resolve)
        .catch(reject => {
          console.log(reject);
          // TODO: dispatch reject
        });
    });
  }
}
