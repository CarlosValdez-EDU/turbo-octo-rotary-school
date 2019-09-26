import realm from './realm';
import _ from 'lodash';

const DB_NAME = 'App';

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const initAppData = () => {
    return new Promise((resolve, reject) => {
        let db = realm.current();

        try {
            let appDB = Array.from(db.objects(DB_NAME));

            if (appDB && appDB.length == 0) {
                db.write(() => {
                    db.create(DB_NAME, {
                        _id: guid()
                    });
                });
            }
        } catch (error) {
            debugger;
            console.log(error);

            resolve()
        } finally {
            db.close();
        }

        resolve();
    });
}

export const updateAppData = (data) => {
    let db = realm.current();

    try {
        let { appMode, _id, token } = data;
        db.write(() => {
            db.create(DB_NAME, {
                _id: _id,
                appMode: appMode,
                token: token
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

export const getAppData = () => {
    return new Promise((resolve, reject) => {
        let db = realm.current();
        let appData = undefined;

        try {
            let appDB = Array.from(db.objects(DB_NAME));

            if (appDB && appDB.length > 0) {
                appData = Object.assign({}, _.head(appDB));
            }

        } catch (error) {
            debugger;
            console.log(error);

            reject(error);
        } finally {
            db.close();
        }

        resolve(appData)
    });
}

export const clearAppData = () => {
    let db = realm.current();

    try {
        db.write(() => {
            let appDb = db.objects(DB_NAME);

            db.delete(appDb);
        });
    } catch (error) {
        debugger;
        console.log(error);
    } finally {
        db.close();
    }
}