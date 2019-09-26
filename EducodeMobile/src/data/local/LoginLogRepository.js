import realm from './realm';
import _ from 'lodash';

const DB_NAME = 'LoginLog';

export const logLogin = (data) => {
    const db = realm.current();

    try {
        const { _id } = data;

        let logLogin = Array.from(db.objects(DB_NAME).filtered('_id == $0', _id));

        db.write(() => {
            db.create(DB_NAME, {
                _id: _id,
                userInLoginLog: (logLogin && logLogin.length == 0) ? 'false' : 'true'
            },
                true
            );
        });
    } catch (error) {
        debugger;
        console.log(error);
    } finally {
        db.close();
    }
}

export const verifyLogin = (_id) => {
    return new Promise((resolve, reject) => {
        const db = realm.current();

        try {
            let logLogin = _.head(Array.from(db.objects(DB_NAME).filtered('_id == $0', _id)));

            resolve(logLogin.userInLoginLog === 'true' ? true : false);
        } catch (error) {
            debugger;
            console.log(error);
            reject(error);
        } finally {
            db.close();
        }
    });
}

export const clearLogDb = () => {
    const db = realm.current();
    try {
        db.write(() => {
            let logsDb = db.objects(DB_NAME);

            db.delete(logsDb);
        });
    } catch (error) {
        debugger;
        console.log(error);
    } finally {
        db.close();
    }
}