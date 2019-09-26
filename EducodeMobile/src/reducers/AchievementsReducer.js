import {
    SET_ACHIEVEMENT_LIST,
    ACHIEVEMENTS_LOADING,
    CLEAR_STATE
} from '@constants/Types';

const INITIAL_STATE = {
    achievementsList: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ACHIEVEMENT_LIST:
            return {
                ...state,
                achievementsList: action.payload.achievements,
                loading: action.payload.loading
            }
        case ACHIEVEMENTS_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case CLEAR_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}