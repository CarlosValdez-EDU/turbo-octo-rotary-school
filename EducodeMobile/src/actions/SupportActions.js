import _ from 'lodash';
import {
    SUPPORT_IS_BUSY,
    SUCCESS_SUPPORT_CREDENTIALS,
    ERROR_SUPPORT_CREDENTIALS,
    WAITING_FOR_TECH_SUPPORT,
    JOINING_ROOM,
    MESSAGE,
    RESET_ERROR_CREDENTIALS,
    RESET_SUPPORT,
    USER_IN_CHAT_ROOM,
    UPDATE_TECH_IMAGE,
    UPDATE_USER_SUPPORT_IMAGE
} from '@constants/Types';
import {
    CHECK_ACCESS,
    JOIN_ROOM,
    SEND_TO_ROOM,
    IS_TYPING,
    GET_USER_PROPERTY
} from '@constants/AppConstants';
import { getCurrentUser } from "@data/local/UserRepository";
import Socket from '@data/remote/socket_client/Socket';

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

export const checkAccess = (username, password) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                let actualUser = getCurrentUser();

                let data = {
                    password: password,
                    username: username
                }

                let response = await dispatch(sendCommand(CHECK_ACCESS, data));

                if (response && _.get(response, ['_id'])) {
                    if (actualUser._id === _.get(response, ['_id'])) {
                        dispatch({
                            type: ERROR_SUPPORT_CREDENTIALS
                        });
                    } else {
                        dispatch({
                            type: SUCCESS_SUPPORT_CREDENTIALS
                        });
                    }
                } else {
                    dispatch({
                        type: ERROR_SUPPORT_CREDENTIALS
                    });
                }
            } catch (error) {
                console.log(error);
                dispatch({
                    type: ERROR_SUPPORT_CREDENTIALS
                });
            } finally {
                resolve();
            }
        });
    }
}

export const joinRoom = roomId => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!roomId) {
                    
                    dispatch({
                        type: WAITING_FOR_TECH_SUPPORT
                    });

                    roomId = uuid();
                }

                dispatch({
                    type: JOINING_ROOM,
                    payload: roomId
                });

                let data = {
                    roomId: roomId,
                    tech: false
                }

                await dispatch(sendCommand(JOIN_ROOM, data));

                resolve();

            } catch (error) {
                debugger;
                console.log(error);

                resolve();
            }
        });
    }
}

export const sendMessage = (text, roomId) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch({
                    type: MESSAGE,
                    payload: {
                        id: uuid(),
                        message: text,
                        userId: _.get(getState().app, ['user', '_id']),
                        userName: _.get(getState().app, ['user', 'username'])
                    }
                });

                let data = {
                    message: text,
                    roomId: roomId
                }

                await dispatch(sendCommand(SEND_TO_ROOM, data));
            } catch (error) {
                console.log(error);
            } finally {
                resolve();
            }
        });
    }
}

export const userTyping = (roomId, isTyping) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    isTyping: isTyping,
                    roomId: roomId
                }

                dispatch(sendCommand(IS_TYPING, data));
            } catch (error) {
                console.log(error);
            } finally {
                resolve();
            }
        });
    }
}

export const userInChatRoom = (inChatRoom) => {
    return ({
        type: USER_IN_CHAT_ROOM,
        payload: inChatRoom
    });
}

export const resetErrorCredentials = () => {
    return ({
        type: RESET_ERROR_CREDENTIALS
    });
}

export const getUserImage = (userId) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch({
                    type: SUPPORT_IS_BUSY,
                    payload: true
                });

                let data = {
                    _id: userId,
                    path: 'image'
                }
                
                let image = await dispatch(sendCommand(GET_USER_PROPERTY, data));
                if (image) {
                    let actualUser = getCurrentUser();
                    if (userId === actualUser._id) {
                        dispatch({
                            type: UPDATE_USER_SUPPORT_IMAGE,
                            payload: image
                        })
                    } else {
                        dispatch({
                            type: UPDATE_TECH_IMAGE,
                            payload: image
                        });
                    }
                }
            } catch (error) {
                console.log(error);
                debugger;
            } finally {
                dispatch({
                    type: SUPPORT_IS_BUSY,
                    payload: false
                });

                resolve();
            }
        })
    }
}

export const closeButtonPressed = () => {
    return dispatch => {
        Socket.disconnect();

        dispatch ({
            type: RESET_SUPPORT
        });
    }
}

export const resetSupport = () => {
    return ({
        type: RESET_SUPPORT
    });
}