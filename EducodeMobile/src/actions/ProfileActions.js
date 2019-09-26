import {
    UPDATE_USER_PHOTO,
    GET_USER_INFO,
    GET_USER_INFO_FAIL,
    UPDATE_USER_PHOTO_FAIL,
    PROFILE_IS_LOADING,
    PROFILE_FIRSTNAME_CHANGED,
    PROFILE_LASTNAME_CHANGED,
    PROFILE_USERNAME_CHANGED,
    PROFILE_CONFIRM_PASSWORD_CHANGED,
    LOAD_REWARDS,
    PROFILE_PASSWORD_CHANGED,
    PROFILE_CONFIRM_PASSWORD_CHANGED_SUCESS,
    PROFILE_CONFIRM_PASSWORD_CHANGED_FAIL,
    RESET_PROFILE_ERRORS
} from '@constants/Types';
import {
    SET_USER_PROPERTY,
    GET_USER,
    SAVE_USER,
    GET_USER_REWARDS,
    CHANGE_USER_PASSWORD
} from '@constants/AppConstants';
import _ from 'lodash';
import Socket from '@data/remote/socket_client/Socket';
import store from '@store/ConfigureStore';
import { getCurrentUser } from '@data/local/UserRepository';

export const profileisLoading = (isLoading) => {
    return {
        type: PROFILE_IS_LOADING,
        payload: isLoading
    }
}

export const firstnameChanged = (text) => {
    return {
        type: PROFILE_FIRSTNAME_CHANGED,
        payload: text
    };
};

export const lastnameChanged = (text) => {
    return {
        type: PROFILE_LASTNAME_CHANGED,
        payload: text
    };
};

export const usernameChanged = (text) => {
    return {
        type: PROFILE_USERNAME_CHANGED,
        payload: text
    };
};

export const profilePasswordChanged = (text) => {
    return {
        type: PROFILE_PASSWORD_CHANGED,
        payload: text
    };
};

export const resetProfileErrorState = () => {
    return {
        type: RESET_PROFILE_ERRORS
    };
};

export const profileConfirmPasswordChanged = (text) => {
    return {
        type: PROFILE_CONFIRM_PASSWORD_CHANGED,
        payload: text
    };
};

export const updateUserPhoto = (image) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            dispatch({
                type: UPDATE_USER_PHOTO,
                payload: image
            });
            try {

                let userId = _.get(store.getState().app, ['user', '_id']);
                let userInformation = await dispatch(sendCommand(GET_USER, { "_id": userId }));

                let _id = _.get(userInformation, '_id');
                let created = _.get(userInformation, ['created']);
                let email = _.get(userInformation, 'email');
                let firstName = _.get(userInformation, 'firstName');
                let lastLogin = _.get(userInformation, 'lastLogin');
                let lastModified = _.get(userInformation, 'lastModified');
                let lastModifiedBy = _.get(userInformation, ['lastModifiedBy']);
                let lastName = _.get(userInformation, 'lastName');
                let locate = _.get(userInformation, 'locate');
                let rank = _.get(userInformation, 'rank');
                let type = _.get(userInformation, 'type');
                let username = _.get(userInformation, 'username');
                let licensee = _.get(userInformation, ['licensee']);

                let user = {
                    data: {
                        _id: _id,
                        created: created,
                        email: email,
                        firstName: firstName,
                        image: image,
                        lastLogin: lastLogin,
                        lastModified: lastModified,
                        lastModifiedBy: lastModifiedBy,
                        lastName: lastName,
                        locate: locate,
                        rank: rank,
                        type: 'traditional',
                        username: username,
                        type: type,
                        licensee: licensee
                    },
                    isNew: false
                }
                let updatePhoto = await dispatch(sendCommand(SAVE_USER, user));

                dispatch({
                    type: UPDATE_USER_PHOTO,
                    payload: image
                });

                resolve();

            } catch (error) {
                console.debug('ERROR FROM UPDATE PHOTO ACTION>>>>>>',error);
                dispatch({
                    type: UPDATE_USER_PHOTO_FAIL
                });

                resolve();
            }
        });
    }
}

export const getUserInfo = () => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch({
                    type: PROFILE_IS_LOADING,
                    payload: true
                });

                let userId = _.get(store.getState().app, ['user', '_id']);

                let data = await dispatch(sendCommand(GET_USER, { "_id": userId }));

                console.log(data.image);

                let firstname = _.get(data, 'firstName');
                let lastname = _.get(data, 'lastName');
                let username = _.get(data, 'username');
                let image = _.get(data, 'image');
                let rank = _.get(data, 'rank');
                
                let currentUser = await getCurrentUser();
                let licenseeId = _.get(currentUser, 'licenseeId');

                dispatch({
                    type: GET_USER_INFO,
                    payload: {
                        firstName: firstname,
                        lastName: lastname,
                        username: username,
                        image: image,
                        rank: rank,
                        licenseeId: licenseeId,
                    }
                });

                dispatch({
                    type: PROFILE_IS_LOADING,
                    payload: false
                });

                resolve();

            } catch (error) {
                console.debug(error);
                dispatch({
                    type: GET_USER_INFO_FAIL
                });

                resolve();
            }
        });
    }
}

export const getUserRewards = () => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch({
                    type: PROFILE_IS_LOADING,
                    payload: true
                });

                let data = await dispatch(sendCommand(GET_USER_REWARDS, {}));

                let gifts = _.map(data, gift => {

                    return _.get(gift, ['gift', 'gift']);
                });

                dispatch({
                    type: LOAD_REWARDS,
                    payload: {
                        gift: gifts
                    }
                });

                resolve();

            } catch (error) {
                console.debug(error);

                resolve();
            }
        });
    }
}

export const updateInfo = (firstName, lastName, username) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                let userId = _.get(store.getState().app, ['user', '_id']);
                let userInformation = await dispatch(sendCommand(GET_USER, { "_id": userId }));

                let _id = _.get(userInformation, '_id');
                let created = _.get(userInformation, ['created']);
                let lastLogin = _.get(userInformation, 'lastLogin');
                let lastModified = _.get(userInformation, 'lastModified');
                let lastModifiedBy = _.get(userInformation, ['lastModifiedBy']);
                let locate = _.get(userInformation, 'locate');
                let rank = _.get(userInformation, 'rank');
                let licensee = _.get(userInformation, ['licensee']);

                let data = {
                    data: {
                        _id: _id,
                        created: created,
                        email: username,
                        firstName: firstName,
                        lastLogin: lastLogin,
                        lastModified: lastModified,
                        lastModifiedBy: lastModifiedBy,
                        lastName: lastName,
                        locate: locate,
                        rank: rank,
                        username: username,
                        licensee: licensee
                    },
                    isNew: false
                }

                let response = await dispatch(sendCommand(SAVE_USER, data));

                resolve();

            } catch (error) {
                console.log('UPDATE INFO ERROR>>>>>>', error);
                resolve();
            }
        });
    }
}

export const changePassword = (password) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch({
                    type: PROFILE_PASSWORD_CHANGED
                });

                let userId = _.get(store.getState().app, ['user', '_id']);
                let userInformation = await dispatch(sendCommand(GET_USER, { "_id": userId }));

                let licensee = _.get(userInformation, ['licensee']);

                let data = {
                    _id: userId,
                    password: password,
                    licensee: licensee
                }

                let response = await dispatch(sendCommand(CHANGE_USER_PASSWORD, data));

                console.log('CHANGE PASSWORD RESPONSE>>>>>>>>>>.', response);

                dispatch({
                    type: PROFILE_CONFIRM_PASSWORD_CHANGED_SUCESS
                  });

                  resolve();
            } catch (error) {
                console.log(error);
                dispatch({
                    type: PROFILE_CONFIRM_PASSWORD_CHANGED_FAIL,
                    payload: error
                  });

                  resolve();
            }
        });
    }
}