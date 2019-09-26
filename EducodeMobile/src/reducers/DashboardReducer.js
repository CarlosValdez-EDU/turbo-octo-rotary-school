import {
    LOADING_CLASSES_INFO,
    LOAD_USER_CLASSES,
    LOAD_CLASSES_FAIL,
    LOAD_USER_INFO,
    LOAD_USER_LAST_CLASS,
    SHOW_PURCHASE_SCREEN,
    RESET_VERIFY_LOG_LOGIN,
    LOAD_CURRICULUMS,
    LOAD_COMPLETED_CLASSES,
    NEW_ITEMS_COUNT,
    SEARCH_IN_PROGRESS_CURRICULUMS,
    SEARCH_AVAILABLE_CURRICULUMS,
    SEARCH_COMPLETED_CURRICULUMS,
    CLEAR_SEARCH,
    ACHIEVEMENT_OVERALL_PROGRESS,
    CLEAR_STATE,
    TAB_SELECTED,
    KEYBOARD_OPEN,
    SHOW_CERTIFICATE
} from '@constants/Types';

const INITIAL_STATE = {
    isLoading: false,
    userImage: '',
    userName: '',
    userClasses: [],
    searchUserClasses: undefined,
    lastClass: {
        id: '',
        title: ''
    },
    userInLoginLog: undefined,
    curriculums: [],
    searchCurriculums: undefined,
    completedCurriculums: [],
    searchCompletedCurriculums: undefined,
    newItemsCount: 0,
    achievementOveralProgress: 0,
    tabSelected: 1,
    keyboardOpen: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_USER_INFO:
            return {
                ...state,
                userName: action.payload.userName,
                userImage: action.payload.userImage
            }
        case LOADING_CLASSES_INFO:
            return {
                ...state,
                isLoading: true
            }
        case LOAD_USER_CLASSES:
            return {
                ...state,
                isLoading: false,
                userClasses: action.payload
            }
        case LOAD_CLASSES_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case LOAD_USER_LAST_CLASS:
            return {
                ...state,
                lastClass: {
                    ...state.lastClass,
                    id: action.payload.id,
                    title: action.payload.title
                }
            }
        case LOAD_CURRICULUMS:
            return {
                ...state,
                curriculums: action.payload
            }
        case LOAD_COMPLETED_CLASSES:
            return {
                ...state,
                completedCurriculums: action.payload
            }
        case NEW_ITEMS_COUNT:
            return {
                ...state,
                newItemsCount: action.payload
            }
        case SHOW_PURCHASE_SCREEN:
            return {
                ...state,
                userInLoginLog: action.payload
            }
        case RESET_VERIFY_LOG_LOGIN:
            return {
                ...state,
                userInLoginLog: undefined
            }
        case SEARCH_AVAILABLE_CURRICULUMS:
            return {
                ...state,
                searchCurriculums: action.payload
            }
        case SEARCH_IN_PROGRESS_CURRICULUMS:
            return {
                ...state,
                searchUserClasses: action.payload
            }
        case SEARCH_COMPLETED_CURRICULUMS:
            return {
                ...state,
                searchCompletedCurriculums: action.payload
            }
        case CLEAR_SEARCH:
            return {
                ...state,
                searchUserClasses: undefined,
                searchCurriculums: undefined,
                searchCompletedCurriculums: undefined
            }
        case ACHIEVEMENT_OVERALL_PROGRESS:
            return {
                ...state,
                achievementOveralProgress: action.payload
            }
        case TAB_SELECTED:
            return {
                ...state,
                tabSelected: action.payload
            }
        case KEYBOARD_OPEN:
            return {
                ...state,
                keyboardOpen: action.payload
            }
        case CLEAR_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
} 