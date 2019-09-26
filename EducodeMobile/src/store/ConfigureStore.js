import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '@reducers/';

import {
  init as socketInit,
  sendCommand,
} from '@data/remote/socket_client/SocketClient';

const middleware = [ReduxThunk.withExtraArgument({sendCommand})];

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(...middleware)),
);

socketInit(store);

export default store;
