import {
  SET_CLASS_LIST_DATA,
  SET_EXERCISE_DATA,
  CLASS_ID,
  EXERCISE_IS_LOADING,
  SET_ROOM_ID,
  ON_RUNSCRIPT_ERROR,
  COURSE_CURRICULUM_ID,
  ON_VALIDATION,
  RESET_RESPONSE,
  CLEAR_STATE,
  HIDE_ERROR_VALIDATION,
  TRIAL_MODE_COUNT_VIDEO,
  SHOW_AD,
  HIDE_AD,
  SHOW_NEXT_BUTTON,
  CLEAR_CLASS_INTERFACE_DATA,
  COMPLETED_VIDEO,
  STATE_SUBTITLES,
  SAVE_VIDEO_CURRENTTIME,
  RESET_VIDEO_CURRENTTIME,
  SET_SIDE_MENU_STATE,
  QUIZ_FINISHED,
  QUIZ_STATUS,
  RESET_QUIZ_STATUS,
  BUTTON_ANIMATED
} from '@constants/Types';
//import { stat } from 'fs';

const INITIAL_STATE = {
  originalData: [],
  curriculumData: {},
  exerciseData: {},
  curriculumId: '',
  classId: undefined,
  isLoading: false,
  roomId: undefined,
  showErrorModal: false,
  onRunscriptError: undefined,
  onValidation: undefined,
  videoCount: 0,
  showAd: false,
  videoProgress: false,
  completedVideo: false,
  showSubtitles: '',
  videoProgressEnlapsed: 0,
  savedCurrentTime: false,
  saveVideoTime: true,
  shimmerNext: false,
  sideMenuState: false,
  quizIsFinished: false,
  quizStatus: false,
  buttonAnimated: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CLASS_LIST_DATA:
      return { ...state, curriculumData: action.payload.curriculumData, originalData: action.payload.originalData };
    case SET_EXERCISE_DATA:
      return { ...state, exerciseData: action.payload };
    case CLASS_ID:
      return { ...state, classId: action.payload };
    case EXERCISE_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ROOM_ID:
      return { ...state, roomId: action.payload };
    case COURSE_CURRICULUM_ID:
      return { ...state, curriculumId: action.payload }
    case ON_RUNSCRIPT_ERROR:
      return { ...state, onRunscriptError: action.payload, showErrorModal: true };
    case ON_VALIDATION:
      return { ...state, onValidation: action.payload, showErrorModal: action.payload ? (action.payload.passed == false ? true : false) : false };
    case RESET_RESPONSE:
      return { ...state, onValidation: undefined, onRunscriptError: undefined, savedCurrentTime: false, videoProgressEnlapsed: 0, videoProgress: false, saveVideoTime: false, shimmerNext: false };
    case HIDE_ERROR_VALIDATION:
      return { ...state, showErrorModal: false, onValidation: undefined, onRunscriptError: undefined }
    case TRIAL_MODE_COUNT_VIDEO:
      return {
        ...state,
        videoCount: action.payload
      }
    case SHOW_AD:
      return {
        ...state,
        showAd: true,
        videoCount: 0
      }
    case HIDE_AD:
      return {
        ...state,
        showAd: false
      }
    case SHOW_NEXT_BUTTON:
      return { ...state, videoProgress: true }
    case COMPLETED_VIDEO:
      return { ...state, completedVideo: true }
    case CLEAR_CLASS_INTERFACE_DATA:
      return {
        ...state,
        originalData: [],
        curriculumData: {},
        exerciseData: {},
        curriculumId: '',
        classId: undefined,
        isLoading: false,
        roomId: undefined,
        showErrorModal: false,
        onRunscriptError: undefined,
        onValidation: undefined,
        showAd: false,
        videoProgress: false,
        completedVideo: false
      };
    case SAVE_VIDEO_CURRENTTIME:
      return { ...state, videoProgressEnlapsed: action.payload, savedCurrentTime: true }
    case RESET_VIDEO_CURRENTTIME:
      return { ...state, savedCurrentTime: false, videoProgressEnlapsed: 0, saveVideoTime: true }
    case SET_SIDE_MENU_STATE:
      return { ...state, sideMenuState: action.payload }
    case QUIZ_FINISHED:
      return {
        ...state,
        quizIsFinished: action.payload
      }
    case QUIZ_STATUS:
      return {
        ...state,
        quizStatus: action.payload
      }
    case RESET_QUIZ_STATUS:
      return {
        ...state,
        quizIsFinished: false,
        quizStatus: false
      }
    case BUTTON_ANIMATED:
      return {
        ...state,
        buttonAnimated: action.payload
      }
    default:
      return state;
  }
};

