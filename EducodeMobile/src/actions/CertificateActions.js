import {
    IS_LOADING_CERTIFICATE,
    SHOW_CERTIFICATE,
    CLEAR_CERTIFICATE_DATA
} from '@constants/Types';
import {
    GET_USER_CERTIFICATE
} from '@constants/AppConstants';
import { getCurrentUser } from '@data/local/UserRepository';

export const getUserCertificate = (classInfo) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {
            try {

                dispatch({
                    type: IS_LOADING_CERTIFICATE,
                    payload: true
                });

                let user = getCurrentUser();

                let data = {
                    userId: user._id,
                    classId: classInfo._id
                }

                let response = await dispatch(sendCommand(GET_USER_CERTIFICATE, data));

                // let response = 'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
                // 'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
                // 'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
                // 'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
                // 'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
                // 'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
                // 'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
                // 'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
                // 'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
                // 'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
                // 'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
                // 'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
                // 'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';

                dispatch({
                    type: SHOW_CERTIFICATE,
                    payload: response
                });
            } catch (error) {
                console.log(error);
                debugger;
            } finally {
                dispatch({
                    type: IS_LOADING_CERTIFICATE,
                    payload: false
                });
                resolve();
            }
        })
    }
}

export const clearCertificateData = () => {
    return ({
        type: CLEAR_CERTIFICATE_DATA
    })
}