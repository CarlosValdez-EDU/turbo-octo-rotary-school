import SInfo from 'react-native-sensitive-info';
import {SAVED_USER, SAVED_PASSWORD} from '@constants/StorageKeys';
import {validateJWT} from '@actions/LoginActions';
import {userLogout} from '@actions/AppActions';
import store from '@store/ConfigureStore';
import NavigationService from './NavigationService';

export function saveCredentials(user, password) {
  console.log('save');
  saveUser(user);
  savePassword(password);
}

export const renewToken = jwt => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await getUser();
      let password = await getPassword();
      console.log('TOKEN MANAGER', user, password);
      if (user && password) {
        // debugger;
        if (jwt != null) {
          const resp = await store.dispatch(validateJWT(user, password, jwt));
          // debugger;
          if (resp === 'invalidJWT') {
            store.dispatch(userLogout());
            NavigationService.navigate('Auth');
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      resolve();
    }
  });
};

function saveUser(user) {
  SInfo.setItem(SAVED_USER, user, {});
}

function savePassword(password) {
  SInfo.setItem(SAVED_PASSWORD, password, {});
}

function getUser() {
  return SInfo.getItem(SAVED_USER, {}).then(value => {
    return value;
  });
}

function getPassword() {
  return SInfo.getItem(SAVED_PASSWORD, {}).then(value => {
    return value;
  });
}

export function deleteInfo() {
  try {
    SInfo.deleteItem(SAVED_USER, {});
    SInfo.deleteItem(SAVED_PASSWORD, {});
  } catch (error) {
    debugger;
  }
}
