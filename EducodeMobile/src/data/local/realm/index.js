import Realm from 'realm';
import UserSchema from './schemas';

function getCurrent() {
    return new Realm([UserSchema]);
}

module.exports = {
    current: getCurrent
}