import {
    ENROLL_MORE_INFO__CLASS,
    SUCCESS_MORE_INFO_ENROLLING_CLASS,
    ERROR_MORE_INFO_ENROLLING_CLASS,
    RESET_MORE_INFO_ENROLL_CLASS
} from '@constants/Types';
import {
    ADD_PUBLIC_USER_TO_CLASS
} from '@constants/AppConstants';
import { getCurrentUser } from '@data/local/UserRepository';

export const enrollMoreInfoClass = (classId) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            dispatch({
                type: ENROLL_MORE_INFO__CLASS
            });

            try {
                let currentUser = await getCurrentUser();

                let data = {
                    userId: currentUser._id,
                    classId: classId
                }
                
                await dispatch(sendCommand(ADD_PUBLIC_USER_TO_CLASS, data));

                dispatch({
                    type: SUCCESS_MORE_INFO_ENROLLING_CLASS
                });

            } catch (error) {
                debugger;
                console.log(error);
                dispatch({
                    type: ERROR_MORE_INFO_ENROLLING_CLASS,
                    payload: error
                })
            } finally {
                resolve();
            }
        })
    }
}

export const resetMoreInfoEnrollClass = () => {
    return {
        type: RESET_MORE_INFO_ENROLL_CLASS
    }
}