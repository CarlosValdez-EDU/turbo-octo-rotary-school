import {
    SET_EVENT_DATA,
    SET_EVENT_REWARD,
    EVENT_LOADING,
    CLEAR_STATE
} from '@constants/Types';

const INITIAL_STATE = {
    eventData: { tasks: [] },
    eventReward: undefined,
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_EVENT_DATA:
            return {
                ...state,
                eventData: action.payload,
                loading: false
            }
        case EVENT_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_EVENT_REWARD:
            return {
                ...state,
                eventReward: action.payload,
            }
        case CLEAR_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}