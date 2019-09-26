import {
    SUPPORT_IS_BUSY,
    SUCCESS_SUPPORT_CREDENTIALS,
    ERROR_SUPPORT_CREDENTIALS,
    WAITING_FOR_TECH_SUPPORT,
    JOINING_ROOM,
    TECH_ENTER_THE_ROOM,
    TECH_SUPPORT_IS_TYPING,
    MESSAGE,
    RESET_ERROR_CREDENTIALS,
    RESET_SUPPORT,
    CLEAR_STATE,
    TECH_LEFT_CHAT,
    USER_IN_CHAT_ROOM,
    UPDATE_TECH_IMAGE,
    UPDATE_USER_SUPPORT_IMAGE
} from '@constants/Types';

const INITIAL_STATE = {
    supportIsBusy: false,
    enterCredentials: true,
    success: undefined,
    waitingForTechSupport: false,
    roomId: '',
    techSupportIsTyping: false,
    messages: [],
    techLeftChat: false,
    userInChatScreen: false,
    userImage: '',
    techUser: {
        techId: '',
        techImage: ''
    },
    userInSupportSession: false,
    techMessageCounter: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUPPORT_IS_BUSY:
            return {
                ...state,
                supportIsBusy: action.payload
            }
        case SUCCESS_SUPPORT_CREDENTIALS:
            return {
                ...state,
                success: true
            }
        case ERROR_SUPPORT_CREDENTIALS:
            return {
                ...state,
                success: false
            }
        case RESET_ERROR_CREDENTIALS:
            return {
                ...state,
                success: undefined
            }
        case WAITING_FOR_TECH_SUPPORT:
            return {
                ...state,
                userInSupportSession: true,
                waitingForTechSupport: true
            }
        case JOINING_ROOM:
            return {
                ...state,
                enterCredentials: false,
                roomId: action.payload
            }
        case TECH_ENTER_THE_ROOM:
            return {
                ...state,
                waitingForTechSupport: false,
                userInSupportSession: true,
                techUser: {
                    ...state.techUser,
                    techId: action.payload
                }
            }
        case TECH_SUPPORT_IS_TYPING:
            return {
                ...state,
                techSupportIsTyping: action.payload
            }
        case MESSAGE:
            return {
                ...state,
                techSupportIsTyping: false,
                messages: [...state.messages, {
                    _id: action.payload.id,
                    text: action.payload.message,
                    createdAt: new Date(),
                    user: {
                        _id: action.payload.userId,
                        name: action.payload.userName,
                    }
                }],
                techMessageCounter: action.payload.techMessageCounter ? state.techMessageCounter + action.payload.techMessageCounter : state.techMessageCounter
            }
        case TECH_LEFT_CHAT:
            return {
                ...state,
                techLeftChat: true
            }
        case USER_IN_CHAT_ROOM:
            return {
                ...state,
                userInChatScreen: action.payload,
                techMessageCounter: 0
            }
        case UPDATE_TECH_IMAGE:
            return {
                ...state,
                techUser: {
                    ...state.techUser,
                    techImage: action.payload
                }
            }
        case UPDATE_USER_SUPPORT_IMAGE:
            return {
                ...state,
                userImage: action.payload
            }
        case RESET_SUPPORT:
            return INITIAL_STATE;
        case CLEAR_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}