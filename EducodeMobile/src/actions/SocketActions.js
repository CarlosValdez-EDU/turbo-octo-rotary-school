import Socket from '@data/remote/socket_client/Socket';

export const sendCommand = (command, params = undefined, timeout = 30000) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(Socket.sendCommand(command, params, timeout)).then(resolve).catch(reject);
        });
    }
};