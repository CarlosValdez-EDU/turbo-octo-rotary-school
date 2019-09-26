import Realm from 'realm';
import Schemas from './schemas';

function configureRealm() {
    var realm = new Realm(Schemas);
    realm.close();
}

module.exports = configureRealm;