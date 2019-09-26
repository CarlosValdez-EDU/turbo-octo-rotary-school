import { BACKEND_URL } from "@constants/AppConstants";
import debug from "@utils/Debug";
// import store from '@store/ConfigureStore'
import {
    UPDATE_APP_TOKEN,
    TECH_ENTER_THE_ROOM,
    TECH_SUPPORT_IS_TYPING,
    MESSAGE,
    ON_RUNSCRIPT_ERROR,
    ON_VALIDATION,
    TECH_LEFT_CHAT
} from '@constants/Types';
import {
    updateAppToken
} from '@actions/';
import _ from 'lodash';

const io = require('socket.io-client');

const comm = function () {
    debug.log(`Url : ${BACKEND_URL}`);
    debug.log(" --- comm --- CREATING NEW COMM OBJECT!");
    this.activeCommands = [];
    this.connecting = false;
    this.socket = undefined;
    this.logEvents = true;
};

comm.prototype.init = function (store) {
    this.store = store;
}

comm.prototype.isConnected = function () {
    return (this.socket && this.socket.connected) || false;
};

comm.prototype.connect = function (reconnectionAttempts = 5) {
    return new Promise(async (resolve, reject) => {
        if (this.logEvents) debug.log(" --- comm --- connect started! Socket defined:", !!this.socket, "socket id:", this.socket && this.socket.id);

        if (this.connecting) {
            if (this.logEvents) debug.log(" --- comm --- Socket already currently connecting!");
            this.socket.on('connect', resolve);
            this.socket.on('reconnect_failed', reject);

        } else if (this.socket && this.socket.id) {
            if (this.logEvents) debug.log(" --- comm --- Socket already open. Pinging Server.");
            try {
                await this.emit(undefined, "en-ca", "drip", Date.now(), 5000);
                return resolve();
            } catch (err) {
                if (this.logEvents) debug.log(" --- comm --- Failed to ping server. Disconnecting and attempting to reconnect");
                this.disconnect();
                delete this.socket;
                this.connect(reconnectionAttempts).then(resolve).catch(reject);
            }
        } else {
            if (this.logEvents) debug.log(" --- comm --- Opening a new socket!");
            this.connecting = true;
            this.socket = io.connect(BACKEND_URL, { transports: ['websocket'], secure: true, reconnectionAttempts: reconnectionAttempts > 0 ? reconnectionAttempts : Number.MAX_SAFE_INTEGER, reconnectionDelay: 500 });

            this.socket.on('connect', connected.bind(this));
            this.socket.on('disconnect', disconnected.bind(this));
            this.socket.on('connect', resolve);
            this.socket.on('reconnect_failed', reject);
            this.socket.on('exception', exceptionEvent.bind(this));
            this.socket.on('error', errorEvent.bind(this));
            this.socket.on('connect_error', connectErrorEvent.bind(this));
            this.socket.on('connect_timeout', connectTimeoutEvent.bind(this));
            this.socket.on('reconnect', reconnectEvent.bind(this));
            this.socket.on('reconnecting', reconnectingEvent.bind(this));
            this.socket.on('reconnect_error', reconnectErrorEvent.bind(this));
            this.socket.on('reconnect_failed', reconnectFailedEvent.bind(this));
            this.socket.on('invalidate', invalidate.bind(this));
            this.socket.on('fileUploadError', fileUploadError.bind(this));
            this.socket.on('fileUploadComplete', fileUploadComplete.bind(this));
            this.socket.on('roomUpdates', roomUpdates.bind(this));
            this.socket.on('sendToRoom', sendToRoom.bind(this));
            this.socket.on('hasMic', hasMic.bind(this));
            this.socket.on('screenInfo', screenInfo.bind(this));
            this.socket.on('importProgress', importProgress.bind(this));
            this.socket.on('onRunScriptError', onRunScriptError.bind(this));
            this.socket.on('onValidation', onValidation.bind(this));
        }

    });
};

comm.prototype.disconnect = function () {
    if (this.logEvents) debug.log("--- comm --- Disconnecting...");
    this.connecting = false;
    try {
        this.socket.disconnect();
    } catch (err) {
        if (this.logEvents) debug.problem("--- comm --- ERROR DISCONNECTING!", err.message);
    }
};

// called when the socket connects. Anyone listening for a connection event will most likely send a command to the server immediately identifying the user using this this.socket.
const connected = function () {
    if (this.logEvents) debug.log("--- comm --- Socket Connected. id:", this.socket.id);
    this.connecting = false;
    setTimeout(function () {
        this.socket.removeAllListeners("connect");
        this.socket.removeAllListeners("reconnect_failed");
    }.bind(this), 0);
    //window.dispatchEvent(new Event("comm.connected"));
};

// when the socket disconnects, remove all the event listeners and dispatch an event telling anyone listening that the socket is closed (usually for object clean up)
const disconnected = function () {
    if (this.logEvents) debug.log("--- comm --- Socket disconnected.");
    //window.dispatchEvent(new Event("comm.disconnected"));
};

const exceptionEvent = function (data) {
    if (this.logEvents) debug.problem("--- comm --- An exception event error has occurred in the socket!");
    if (this.logEvents) debug.problem(data);
};

const errorEvent = function (data) {
    if (this.logEvents) debug.problem("--- comm --- An error has occurred in the socket!");
    if (this.logEvents) debug.problem(data);
};

const connectErrorEvent = function (data) {
    if (this.logEvents) debug.problem("--- comm --- An connection error has occurred in the socket!");
    if (this.logEvents) debug.problem(data);
};

const connectTimeoutEvent = function (data) {
    if (this.logEvents) debug.problem("--- comm --- A connection timeout has occurred!");
};

const reconnectEvent = function (count) {
    if (this.logEvents) debug.log("--- comm --- The socket has successfully reconnected on attempt #", count);
    this.connecting = false;
    setTimeout(function () {
        this.socket.removeAllListeners("connect");
        this.socket.removeAllListeners("reconnect_failed");
    }.bind(this), 0);
    //window.dispatchEvent(new Event("comm.connected"));
    //window.dispatchEvent(new Event("comm.reconnected"));

};

const reconnectingEvent = function (count) {
    if (this.logEvents) debug.log("--- comm --- Attempting to reconnect to the server. Attempt #", count);
    //window.dispatchEvent(new CustomEvent("comm.reconnecting", {detail: count, bubbles: true, cancelable: true}));
};

const reconnectErrorEvent = function (data) {
    if (this.logEvents) debug.problem("--- comm --- An error has occurred attempting to reconnect to the server!");
    if (this.logEvents) debug.problem(data);
};

const reconnectFailedEvent = function (data) {
    if (this.logEvents) debug.problem("--- comm --- Reconnection to the server has failed!");
    if (this.logEvents) debug.problem(data && data.message ? data.message : data);
    this.disconnect();
    setTimeout(function () {
        this.socket.removeAllListeners("connect");
        this.socket.removeAllListeners("reconnect_failed");
    }.bind(this), 0);

    //window.dispatchEvent(new Event("comm.reconnectFailed"));
};

// --------- incoming messages triggered by the server -------------------------------------------------------------------------------------------

const invalidate = function (data) {
    if (this.logEvents) debug.receive("<-- incoming --- Invalidate --- ", data.type);
    //window.dispatchEvent(new CustomEvent("invalidate", {detail: data, bubbles: true, cancelable: true}));
};

const fileUploadError = function (data) {
    if (this.logEvents) debug.receive("<-- incoming --- fileUploadError --- ", data);
    //window.dispatchEvent(new CustomEvent("fileUploadError", {detail: data, bubbles: true, cancelable: true}));
};

const fileUploadComplete = function (data) {
    if (this.logEvents) debug.receive("<-- incoming --- fileUploadComplete --- ", data);
    //window.dispatchEvent(new CustomEvent("fileUploadComplete", {detail: data, bubbles: true, cancelable: true}));
};

const roomUpdates = function (data) {
    //debugger;
    if (this.logEvents) debug.receive("<-- incoming --- roomUpdates --- ", data);
};

const sendToRoom = function (data) {
    if (this.logEvents) debug.receive("<-- incoming --- sendToRoom --- ", data);

    let user = _.get(this.store.getState().app, ['user', '_id']);
    let chatUser = _.get(data, ['user']);

    switch (_.get(data, ['type'])) {
        case 'joined':
            if (user !== chatUser) {
                this.store.dispatch({
                    type: TECH_ENTER_THE_ROOM,
                    payload: data.user
                });
            }
            break;
        case 'typing':
            if (user !== chatUser) {
                this.store.dispatch({
                    type: TECH_SUPPORT_IS_TYPING,
                    payload: _.get(data, ['isTyping'])
                });
            }
            break;
        case 'message':
            if (user !== chatUser) {
                this.store.dispatch({
                    type: MESSAGE,
                    payload: {
                        id: _.get(data, ['id']),
                        message: _.get(data, ['message']),
                        userId: _.get(data, ['user']),
                        userName: 'Tech Support',
                        techMessageCounter: 1
                    }
                });
            }
            break;
        case 'left':
            this.store.dispatch({
                type: TECH_LEFT_CHAT
            })
        default:
            break;
    }
    //window.dispatchEvent(new CustomEvent("sendToRoom", {detail: data, bubbles: true, cancelable: true}));
};

const hasMic = function (data) {
    if (this.logEvents) debug.receive("<-- incoming --- hasMic --- ", data);

    //if(data && _.get(data, []))
    //window.dispatchEvent(new CustomEvent("hasMic", {detail: data, bubbles: true, cancelable: true}));
};

const screenInfo = function (data) {
    if (this.logEvents) debug.receive("<-- incoming --- screenInfo --- ", data);
    //window.dispatchEvent(new CustomEvent("screenInfo", {detail: data, bubbles: true, cancelable: true}));
};

const importProgress = function (data) {
    if (this.logEvents) debug.receive("<-- incoming --- importProgress --- ", data);
    //window.dispatchEvent(new CustomEvent("importProgress", {detail: data, bubbles: true, cancelable: true}));
};

const onRunScriptError = function (data) {
    try {
        const userId = _.get(this.store.getState().app, ['user', '_id']);
        const exerciseId = _.get(this.store.getState().course, ['exerciseData', '_id']);
        if (userId && exerciseId) {
            if (userId === _.get(data, ['userId']) && exerciseId === _.get(data, ['unitId'])) {
                this.store.dispatch({
                    type: ON_RUNSCRIPT_ERROR,
                    payload: data
                });
            }
        }
    } catch (err) {
        reject(err);
    }
}

const onValidation = function (data) {
    try {
        const userId = _.get(this.store.getState().app, ['user', '_id']);
        const exerciseId = _.get(this.store.getState().course, ['exerciseData', '_id']);
        if (userId && exerciseId) {
            if (userId === _.get(data, ['userId']) && exerciseId === _.get(data, ['unitId'])) {
                this.store.dispatch({
                    type: ON_VALIDATION,
                    payload: data
                });
            }
        }
    } catch (err) {
        console.log(err);
        reject(err);
    }
}

// --------------- Transmission Functions ----------------------------------------------------------------------------

comm.prototype.emit = function (jwt, locale, command, data = undefined, timeout = 30000) {
    return new Promise((resolve, reject) => {
        if (!this.socket) return reject();

        // add the current jwt to the data
        let payload = {
            jwt: jwt,
            locale: 'en-CA',
            data: data
        };

        let commandTimedOut = false;
        let timeoutTimer = timeout && setTimeout(() => {
            commandTimedOut = true;
            reject("timeout");
        }, timeout);
        debug.send("--> comm --- Sending - '" + command + "' ", payload);
        this.socket.emit(command, payload, (response) => {
            try {
                if (commandTimedOut) return;
                if (timeoutTimer) clearTimeout(timeoutTimer);
                if (this.logEvents) debug.receive("<-- '" + command + "' ", response);
                if (!response) return reject("noResponse");
                if (response.hasOwnProperty("jwt")) {
                    this.store.dispatch(updateAppToken(response.jwt));
                }
                if (response.successful === false && _.get(response, ["data", "message"]) === "invalidJWT") {
                    // this.store.dispatch()
                    reject("invalidJWT");
                }
                if (response.successful !== true) {
                    reject(_.get(response, ["data"]));
                }
                resolve(response.data);
            } catch (err) {
                debugger;
                debug.log("Error in comm - emit callback: ", err);

                reject(err);
            }
        });
    });

};

comm.prototype.sendCommand = function (command, params = undefined, timeout = 30000) {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.isConnected()) await this.connect();
                let response = await this.emit(this.store.getState().app.jwt, this.store.getState().app.locale, command, params, timeout);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    };
};

comm.prototype.joinRoom = async function (roomName) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!this.isConnected()) await this.connect();
            this.socket.join(roomName);
            resolve(roomName);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = new comm();