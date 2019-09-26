import _ from 'lodash';
import {
    GET_CLASSES,
    GET_STUDENTS_IN_CLASS,
    GET_CURRICULUMS,
    ADMIN_USER
} from '@constants/AppConstants';
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
    TAB_SELECTED,
    KEYBOARD_OPEN,
} from '@constants/Types';
import store from '@store/ConfigureStore';
import {
    unixTimeToDate,
    formatDate
} from '@utils/DateUtils';
import { logLogin, verifyLogin } from '@data/local/LoginLogRepository';
import { getCurrentUser } from '@data/local/UserRepository';
import curriculumsFile from '@assets/curriculums.json';

TabContent = Object.freeze({
    InProgress: 1,
    Available: 2,
    Completed: 3
});

export const loadUserInfo = () => {
    let userName = `${_.get(store.getState().app, ['user', 'firstName'])} ${_.get(store.getState().app, ['user', 'lastName'])}`;
    let userImage = _.get(store.getState().app, ['user', 'image']);
    return ({
        type: LOAD_USER_INFO,
        payload: {
            userName: userName,
            userImage: userImage || ''
        }
    });
}

export const getAvailableCurriculums = () => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                // let curriculumsRaw = _.get(curriculumsFile, ['curriculums']);

                // let curriculums = _.filter(curriculumsRaw, curriculum => {
                //     if (curriculum.locale === getState().app.locale) {
                //         return curriculum;
                //     }
                // });

                // dispatch({
                //     type: LOAD_CURRICULUMS,
                //     payload: curriculums
                // });

                let currentUser = await getCurrentUser();

                let data = {
                    licensee: currentUser.licenseeId,
                    fields: ['name'],
                    sort: 'name',
                    internal: true,
                    locale: currentUser.locale,
                    asc: true,
                    limit: 15,
                    page: 1
                }

                let curriculums = await dispatch(sendCommand('getClasses', data));

                dispatch({
                    type: LOAD_CURRICULUMS,
                    payload: _.get(curriculums, ['records'])
                });

                resolve(curriculums);
            } catch (error) {
                debugger;
                console.log(error);
                resolve();
            }
        });
    }
}

export const searchContent = (searchText, curriculums, contentType, locale) => {
    return (dispatch) => {
        let searchResults = undefined;

        if (!_.isEmpty(searchText)) {
            searchResults = _.filter(curriculums, item => {
                let name = locale === 'en-CA' ? _.get(item, ['name_en-CA']) : _.get(item, ['name_fr-CA']);
                return name.toLowerCase().includes(searchText);
            });
        }

        switch (contentType) {
            case TabContent.InProgress:
                dispatch({
                    type: SEARCH_IN_PROGRESS_CURRICULUMS,
                    payload: searchResults
                });
            case TabContent.Available:
                dispatch({
                    type: SEARCH_AVAILABLE_CURRICULUMS,
                    payload: searchResults
                });
            case TabContent.Completed:
                dispatch({
                    type: SEARCH_COMPLETED_CURRICULUMS,
                    payload: searchResults
                });
        }
    }
}

export const clearSearch = () => {
    return {
        type: CLEAR_SEARCH
    }
}

export const countNewItems = (curriculums) => {
    return (dispatch, getState, { sendCommand }) => {
        let newItems = _.filter(curriculums, { 'isNew': true });

        if (newItems && newItems.length > 0) {
            dispatch({
                type: NEW_ITEMS_COUNT,
                payload: newItems.length
            });
        }
    }
}

export const verifyLoginLog = () => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise((resolve, reject) => {
            try {
                let currentUser = getCurrentUser();

                if (currentUser._id !== ADMIN_USER) {
                    verifyLogin(currentUser._id).then(userInLog => {
                        if (userInLog == true) {
                            dispatch({
                                type: SHOW_PURCHASE_SCREEN,
                                payload: true
                            });
                        } else {
                            logLogin(currentUser);
                            dispatch({
                                type: SHOW_PURCHASE_SCREEN,
                                payload: false
                            });
                        }
                    }).catch(error => {
                        debugger;
                        console.log(error);
                        reject(error);
                    });
                } else {
                    dispatch({
                        type: SHOW_PURCHASE_SCREEN,
                        payload: false
                    });
                }

                resolve();
            } catch (error) {
                console.log(error);
                resolve();
            }
        });
    }
}

export const resetVerifyLogLogin = () => {
    return ({
        type: RESET_VERIFY_LOG_LOGIN
    });
}

export const getUserClasses = (page, resultsPerPage, curriculums, showLoader = true) => {
    return (dispatch, getSatate, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {

            if (showLoader == true) {
                dispatch({
                    type: LOADING_CLASSES_INFO
                });
            }

            try {
                let currentUser = getCurrentUser();

                let data = {
                    internal: 'both',
                    fields: ['name'],
                    forUser: currentUser._id,
                    sort: 'name',
                    asc: true,
                    page: 1,
                    limit: 15,
                    locale: currentUser.locale
                }

                let info = await dispatch(sendCommand(GET_CLASSES, data));

                let classes = _.get(info, ['records']);

                if (classes && classes.length > 0) {
                    await asyncForEach(classes, async (classItem) => {
                        let classData = {
                            classId: classItem._id,
                            userId: currentUser._id,
                            locale: currentUser.locale
                        }

                        let clmContent = _.find(_.get(curriculums, ['records']), clm => {
                            if (clm._id === _.get(classItem, ['curriculum', '_id'])) {
                                return clm;
                            }
                        });

                        classItem.trialMode = clmContent ? clmContent.trialMode : undefined;

                        let classInfo = await dispatch(sendCommand('getStudentClassProgress', classData));

                        classItem.total = _.get(classInfo, ['total']) ? _.get(classInfo, ['total']) : 0;
                        classItem.completed = _.get(classInfo, ['completed']) ? _.get(classInfo, ['completed']) : 0;
                        classItem.progress = _.get(classInfo, ['progress']) ? _.get(classInfo, ['progress']) : 0;
                        
                        //Test data to set the progress to 100%
                        //classItem.total = 100;
                        //classItem.completed = 100;
                        //classItem.progress = 100;


                        // if (classInfo._id === 'class-cs-0_en-CA') {
                        //     classItem.total = 280;
                        //     classItem.completed = 280;
                        //     classItem.progress = 100;
                        // }
                    });

                    let completedClasses = _.filter(classes, classInfo => { if (classInfo.progress === 100) return classInfo });

                    dispatch({
                        type: LOAD_COMPLETED_CLASSES,
                        payload: completedClasses
                    });

                    classes = _.filter(classes, classInfo => { if (classInfo.progress !== 100) return classInfo });

                    dispatch({
                        type: LOAD_USER_CLASSES,
                        payload: classes
                    });

                    let userLastClass = getUserLastClass(classes);
                    if (userLastClass) {
                        dispatch({
                            type: LOAD_USER_LAST_CLASS,
                            payload: {
                                id: _.get(userLastClass, ['_id']),
                                title: _.get(userLastClass, ['name'])
                            }
                        });
                    }

                } else {
                    dispatch({
                        type: LOAD_USER_CLASSES,
                        payload: []
                    });
                }

                resolve();
            } catch (error) {
                console.debug(error);
                dispatch({
                    type: LOAD_CLASSES_FAIL
                });

                debugger;

                resolve();
            }
        });
    }
}

// orderClasses = (classes) => {
//     classes = _.map(classes, itemClass => {
//         return _.extend({}, itemClass, {
//             startDateForm: formatDate(unixTimeToDate(itemClass.startDate)),
//             endDateForm: formatDate(unixTimeToDate(itemClass.endDate)),
//             lastAccessForm: unixTimeToDate(itemClass.lastAccessed)
//         })
//     });

//     return _.orderBy(classes, ['lastAccessForm'], ['desc']);
// }

getUserLastClass = (classes) => {
    let lastCurriculum = _.head(classes);

    return lastCurriculum;
}

const getStudentProgress = (classId, username) => {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    activePage: 1,
                    resultsPerPage: 1000,
                    searchOptions: [{
                        field: 'class',
                        group: 'mandatory',
                        logExp: 'eq',
                        type: 'text',
                        value: classId
                    }],
                    sort: {
                        email: 1,
                        firstName: 1,
                        lastName: 1
                    }
                }

                let info = await dispatch(sendCommand(GET_STUDENTS_IN_CLASS, data));

                let students = _.get(info, ['records']);

                let userProgress = _.find(students, student => {
                    return student.username === username;
                });

                resolve(userProgress);
            } catch (error) {
                console.log(error);

                resolve();
            }
        });
    }
}

export const getUserEventProgress = () => {
    return (dispatch, getEvent, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    parentId: 'achievements'
                }
                let response = await dispatch(sendCommand('getUserAchievementOverallProgress', data));

                dispatch({
                    type: ACHIEVEMENT_OVERALL_PROGRESS,
                    payload: response
                });

            } catch (error) {
                console.log(error);
            } finally {
                resolve();
            }
        })
    }
}

export const tabPressed = (indexTab) => {
    return ({
        type: TAB_SELECTED,
        payload: indexTab
    });
}

export const keyboardListener = (keyboardOpen) => {
    return ({
        type: KEYBOARD_OPEN,
        payload: keyboardOpen
    });
}

async function processArray(array) {
    for (const item in array) {
        await func(item);
    };
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}