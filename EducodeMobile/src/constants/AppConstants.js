export const BACKEND_URL = 'https://api.educode.ca/';
//export const BACKEND_URL = 'https://qa.educode.ca:3000';

export const VIDEO_RESOURCES_URL = 'https://app.educode.ca/resources/videos/';
export const CC_RESOURCES_URL = 'https://app.educode.ca/resources/subtitles/';
export const IMAGES_RESOURCES_URL = 'https://app.educode.ca/resources/images/';

//Languages 
export const AVAILABLE_LANGUAGES = [
    { id: '1', languageName: 'English        ' }
    //{ id: '2', languageName: 'Français        ' }
];

// App modes
export const SPU_USER = 'SPU_USER';
export const TRADITIONAL_USER = 'TRADITIONAL_USER';
export const GOD_MODE = 'GOD_MODE';

// Content modes
export const TRIAL_MODE = 'TRIAL_MODE';
export const FULL_MODE = 'FULL_MODE';

// User types
export const ADMIN_USER = 'default_admin_id';
export const ADMIN = 0;
export const TECH = 2;
export const LICENSEE = 3;
export const DISTRICT = 4;
export const SCHOOL = 5;
export const TEACHER = 6;
export const SPU_STUDENT = 7;

//License types
export const SINGLE_USER_LICENSEE = 'spu_licensee';
export const TRADITIONAL_USER_LICENSEE = 'traditional_user';

export const APP_VERSION = 'V 0.0.015';

//Legal Docs
export const ENGLISH_TERMS_AND_CONDITIONS_URL =
  '@assets/legal/privacy_en-ca.html';
export const FRENCH_TERMS_AND_CONDITIONS_URL =
  'https://app.educode.ca/html_assets/legal/terms_fr-CA.htm';
export const ENGLISH_PRIVACY_POLICY_URL =
  'https://app.educode.ca/html_assets/legal/privacy_en-CA.htm';
export const FRENCH_PRIVACY_POLICY_URL =
  'https://app.educode.ca/html_assets/legal/privacy_fr-CA.htm';

//Exercise type
export const QUIZ = 'q';
export const VIDEO = 's';

//Socket endpoints
export const GET_USER = 'getUser';
export const SAVE_USER = 'saveUser';
export const SET_USER_PROPERTY = 'setUserProperty';
export const GET_CLASSES = 'getClasses';
export const GET_CLASS_INTERFACE_DATA = 'getClassInterfaceData';
export const GET_STUDENTS_IN_CLASS = 'getStudentsInClass';
export const CHECK_ACCESS = 'checkAccess';
export const JOIN_ROOM = 'joinRoom';
export const SEND_TO_ROOM = 'sendToRoom';
export const IS_TYPING = 'isTyping';
export const SAVE_PUBLIC_USER = 'createSinglePublicUser';
export const GET_USER_REWARDS = 'getUserRewards';
export const CHANGE_USER_PASSWORD = 'changeUserPassword';
export const SET_LOCALE = 'setLocale';
export const GET_CURRICULUMS = 'getCurriculums';
export const ADD_PUBLIC_USER_TO_CLASS = 'addSinglePublicUserToClass';
//export const VALIDATE_USER_PAYMENT = 'validateUserPayment';
export const VALIDATE_USER_PAYMENT = 'testValidateUserPayment';
export const SET_UNIT_PROPERTY = 'setUnitProperty';
export const SET_CURRENT_EXERCISE = 'setCurrentExercise';
export const JOIN_GENERIC_ROOM = 'joinGenericRoom';
export const FORGOT_PASSWORD = 'forgotPassword';
export const LOGIN = 'login';
export const VALIDATE_JWT = 'validateJWT';
export const GET_USER_PROPERTY = 'getUserProperty';
export const GET_USER_CERTIFICATE = 'getUserCertificate';
export const GET_API_VERSION = 'getAPIVersion';

//Params React Navigation
export const CURRICULUM_VIEW_CONTENT_ID = 'CURRICULUM_VIEW_CONTENT_ID';
export const CURRICULUM_LAST_CLASS_ID = 'CURRICULUM_LAST_CLASS_ID';
export const CURRICULUM_LAST_CLASS_TITLE = 'CURRICULUM_LAST_CLASS_TITLE';

//Class Interface room Id
export const ROOM_ID = 'c8e6e02f-6425-4fc8-98e7-1ed5c1006e1f';

//Forgot Password Error
//IF the account is not found.
export const FORGOT_PASSWORD_ERROR_ACCOUNT_NOT_FOUND = 'accountNotFound';
//IF the account is a traditional student.
export const FORGOT_PASSWORD_ERROR_STUDENT_ACCOUNT = 'studentAccount';
//IF the account is a non-student and there is no email address on the account.
export const FORGOT_PASSWORD_ERROR_NO_EMAIL = 'noEmail';

// RSI Events
export const ON_PROMPT_FOR_RESET_CODE = 'onPromptForResetCode';
export const ON_VALIDATION_COMPLETE = 'onValidationComplete';
