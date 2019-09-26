import realm from './realm';
import _ from 'lodash';

const DB_NAME = 'User';

export const saveUser = (data) => {
    const db = realm.current();

    try { 
        const {
            _id,
            firstName,
            lastName,
            image,
            locale,
            rank,
        } = data;

        const licenseeId = _.get(data, ['licensee', '_id']);

        db.write(() => {
            let user = db.create(DB_NAME, {
                _id: _id,
                licenseeId: licenseeId,
                firstName: firstName,
                lastName: lastName,
                image: image,
                locale: locale ? locale : 'en-CA',
                rank: rank,
            });
        });

    } catch (error) {
        debugger;
        console.log('Error writing user:' + error);
    } finally {
        db.close();
    }
}

export const getCurrentUser = () => {
    const db = realm.current();

    try {
        const dbUser = Array.from(db.objects(DB_NAME));

        if (dbUser && dbUser.length > 0) {
            let user = Object.assign({}, _.head(dbUser));
            return user;
        }

        return null;
    } catch (error) {
        debugger;
        console.log(error);
    } finally {
        db.close()
    }
}

export const updateUser = (user) => {
    const db = realm.current();

    try {
        const {
            _id,
            acceptedTerms,
            firstName,
            image,
            lastLogin,
            lastName,
            locale,
            rank,
            socketid,
            username
        } = user;

        db.write(() => {
            let user = db.create(DB_NAME, {
                _id: _id,
                acceptedTerms: acceptedTerms,
                firstName: firstName,
                image: image,
                lastLogin: lastLogin,
                lastName: lastName,
                locale: locale,
                rank: rank,
                socketid: socketid,
                username: username,
            },
                true
            );
        });

    } catch (error) {
        debugger;
        console.log('Error writing user:' + error);
    } finally {
        db.close();
    }
}

export const deleteUserSession = () => {
    const db = realm.current();
    try {
        db.write(() => {
            let userDb = db.objects(DB_NAME);
            
            db.delete(userDb);
        });
    } catch (error) {
        debugger;
        console.log(error);
    } finally {
        db.close();
    }
}