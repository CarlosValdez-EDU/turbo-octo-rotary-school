import {
    ENROLL_CLASS,
    SUCCESS_ENROLLING_CLASS,
    ERROR_ENROLLING_CLASS,
    RESET_ENROLL_CLASS
} from '@constants/Types';
import {
    ADD_PUBLIC_USER_TO_CLASS
} from '@constants/AppConstants';
import { getCurrentUser } from '@data/local/UserRepository';

export const enrollClass = (classId) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            dispatch({
                type: ENROLL_CLASS
            });

            try {
                let currentUser = await getCurrentUser();

                let data = {
                    userId: currentUser._id,
                    classId: classId
                }
                
                await dispatch(sendCommand(ADD_PUBLIC_USER_TO_CLASS, data));

                dispatch({
                    type: SUCCESS_ENROLLING_CLASS
                });

                resolve();
            } catch (error) {
                dispatch({
                    type: ERROR_ENROLLING_CLASS,
                    payload: error
                })
                console.log(error);
                resolve();
            }
        })
    }
}

export const resetEnrollClass = () => {
    return {
        type: RESET_ENROLL_CLASS
    }
}