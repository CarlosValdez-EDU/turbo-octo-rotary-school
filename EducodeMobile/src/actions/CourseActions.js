import _ from 'lodash';
import {
  SET_CLASS_LIST_DATA,
  SET_EXERCISE_DATA,
  CLASS_ID,
  EXERCISE_IS_LOADING,
  SET_ROOM_ID,
  COURSE_CURRICULUM_ID,
  RESET_RESPONSE,
  HIDE_ERROR_VALIDATION,
  TRIAL_MODE_COUNT_VIDEO,
  SHOW_AD,
  HIDE_AD,
  SHOW_NEXT_BUTTON,
  CLEAR_CLASS_INTERFACE_DATA,
  COMPLETED_VIDEO,
  SAVE_VIDEO_CURRENTTIME,
  RESET_VIDEO_CURRENTTIME,
  SET_SIDE_MENU_STATE,
  QUIZ_FINISHED,
  QUIZ_STATUS,
  RESET_QUIZ_STATUS,
  BUTTON_ANIMATED
} from '@constants/Types';
import { normalizeData } from '@utils/DataNormalizer';
import { ROOM_ID } from "@constants/AppConstants";
import {
  GET_CLASS_INTERFACE_DATA,
  SET_CURRENT_EXERCISE,
  //JOIN_GENERIC_ROOM,
  SET_UNIT_PROPERTY
} from '@constants/AppConstants';
import { getCurrentUser } from '@data/local/UserRepository';
import store from '@store/ConfigureStore';

let lut = [];
for (let i = 0; i < 256; i++) { lut[i] = (i < 16 ? '0' : '') + (i).toString(16); }

function uuid(noDash = false) {
  let d0 = Math.random() * 0xffffffff | 0;
  let d1 = Math.random() * 0xffffffff | 0;
  let d2 = Math.random() * 0xffffffff | 0;
  let d3 = Math.random() * 0xffffffff | 0;
  return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + (noDash ? '' : '-') +
    lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + (noDash ? '' : '-') + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + (noDash ? '' : '-') +
    lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + (noDash ? '' : '-') + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
    lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
}

export const getExerciseData = (teacherMode, userId, _id, showLoader = true) => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (showLoader) {
          dispatch({
            type: EXERCISE_IS_LOADING,
            payload: true
          });
        }

        let data = { teacherMode, userId, _id };
        let classInfo = await dispatch(sendCommand(GET_CLASS_INTERFACE_DATA, data));

        dispatch({
          type: CLASS_ID,
          payload: _.get(classInfo, ['_id'])
        });

        //TODO: send class id for navigation
        let finalData = normalizeData(classInfo, _id, store.getState().app.locale);

        dispatch({
          type: SET_CLASS_LIST_DATA,
          payload: { curriculumData: finalData, originalData: classInfo.units }
        });

        const classUnits = classInfo.units;
        const lastUnitId = classInfo.lastUnit;
        // const lastUnitId = 'exercise-027';
        // const lastUnitId = 'cs-1_en-CA_quiz-001';
        let lastUnitData;

        if (lastUnitId != undefined) {
          for (let i = 0; i < classUnits.length; i++) {
            if (classUnits[i]._id == lastUnitId) {
              if (classUnits[i].type == 'p') {
                lastUnitData = classUnits[i + 1];
                await dispatch(setCurrentExercise(userId, classInfo.curriculum, lastUnitData._id, _id));
                break;
              } else {
                lastUnitData = classUnits[i];
                await dispatch(setCurrentExercise(userId, classInfo.curriculum, lastUnitData._id, _id));
                break;
              }
            }
          }
        } else {
          if (classUnits[0].type == 'p') {
            lastUnitData = classUnits[1];
            await dispatch(setCurrentExercise(userId, classInfo.curriculum, lastUnitData._id, _id));
          } else {
            lastUnitData = classUnits[0];
            await dispatch(setCurrentExercise(userId, classInfo.curriculum, lastUnitData._id, _id));
          }
        }

        lastUnitData.classId = _id;

        //console.log('lastUnitData from CourseActions (109,9) -> ', lastUnitData);


        dispatch({
          type: SET_EXERCISE_DATA,
          payload: lastUnitData
        });


        dispatch({
          type: EXERCISE_IS_LOADING,
          payload: false
        });
      } catch (error) {
        debugger;
        console.log(error);
        resolve();
      } finally {
        resolve();
      }
    });
  }
};

export const getCurriculumId = (userClasses, classId) => {
  return (dispatch, getSatate, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let curriculumData = _.find(userClasses, { '_id': classId });
        let curriculumId = curriculumData.curriculum._id;

        dispatch({
          type: COURSE_CURRICULUM_ID,
          payload: curriculumId
        })
      } catch (error) {
        console.log(error);
      } finally {
        resolve();
      }
    })
  }
}

export const setUnitProperty = (data) => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let currentUser = getCurrentUser();
        _.assign(data, { 'userId': currentUser._id });
        await dispatch(sendCommand(SET_UNIT_PROPERTY, data));
      } catch (error) {
        debugger;
        console.log(error);
      } finally {
        resolve();
      }
    })
  }
}

export const setCurrentExercise = (_id, curriculumId, unitId, classId) => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = { _id, curriculumId, unitId, classId };
        await dispatch(sendCommand(SET_CURRENT_EXERCISE, data));
      } catch (error) {
        console.log(error);
        resolve();
      } finally {
        resolve();
      }
    });
  }
};

export const connectToRoom = () => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let tempUUID = uuid();

        dispatch({
          type: SET_ROOM_ID,
          payload: tempUUID
        });

        let data = { room: tempUUID };
        //await dispatch(sendCommand(JOIN_GENERIC_ROOM, data));

      } catch (error) {
        console.log(error);
        resolve();
      } finally {
        resolve();
      }
    });
  }
};

export const resetResponse = () => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {

        dispatch({
          type: RESET_RESPONSE
        });

      } catch (error) {
        console.log(error);
        resolve();
      } finally {
        resolve();
      }
    });
  }
};

export const showNextButton = () => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SHOW_NEXT_BUTTON
        });
      } catch (error) {
        console.log(error);
        resolve();
      } finally {
        resolve();
      }
    });
  }
}

export const completedVideo = () => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: COMPLETED_VIDEO
        });
      } catch (error) {
        console.log(error);
        resolve();
      } finally {
        resolve();
      }
    });
  }
}

export const hideErrorModalValidation = () => {
  return ({
    type: HIDE_ERROR_VALIDATION
  });
}

export const trialModeCountView = (videoCount) => {
  return dispatch => {
    if (videoCount === 2) {
      dispatch({
        type: SHOW_AD
      });
    } else {
      videoCount += 1;

      dispatch({
        type: TRIAL_MODE_COUNT_VIDEO,
        payload: videoCount
      });
    }
  }
}

export const showAdToUser = () => {
  return ({
    type: SHOW_AD
  });
}

export const hideAd = () => {
  return ({
    type: HIDE_AD
  });
}

export const clearClassInterfaceData = () => {
  return ({
    type: CLEAR_CLASS_INTERFACE_DATA
  });
}

export const saveCurrentVideoTime = (currentTime) => {
  console.log(`It is changing the current time with the new time: ${currentTime.currentTime}`);
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SAVE_VIDEO_CURRENTTIME,
          payload: currentTime.currentTime
        });
      } catch (error) {
        console.log(error);
        resolve();
      } finally {
        resolve();
      }
    });
  }
}

export const resetCurrentVideoTime = () => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: RESET_VIDEO_CURRENTTIME
        });
      } catch (error) {
        console.log(error);
        resolve();
      } finally {
        resolve();
      }
    });
  }
}

export const sendKeyboardClose = (RSI_ROOM_ID) => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await dispatch(sendCommand("sendToGenericRoom", { command: "keyboardClosed", room: RSI_ROOM_ID, message: 'anything' })).catch(err => null);
      } catch (error) {
        console.log(error);
        resolve();
      } finally {
        resolve();
      }
    });
  }
};

export const setSideMenuState = (state) => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_SIDE_MENU_STATE,
          payload: state
        });
      } catch (error) {
        console.log(error);
        resolve();
      } finally {
        resolve();
      }
    });
  }
};

export const quizFinished = (quizIsFinished) => {
  return ({
    type: QUIZ_FINISHED,
    payload: quizIsFinished
  });
}

export const quizFinishedStatus = (quizStatus) => {
  return ({
    type: QUIZ_STATUS,
    payload: quizStatus
  });
}

export const resetQuizStatus = () => {
  return ({
    type: RESET_QUIZ_STATUS
  });
}

export const buttonIsAnimated = (buttonAnimated) => {
  return ({
    type: BUTTON_ANIMATED,
    payload: buttonAnimated
  });
}