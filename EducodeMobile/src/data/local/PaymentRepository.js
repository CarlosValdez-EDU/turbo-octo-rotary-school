import realm from './realm';
import guid from './IdGenerator';
import _ from 'lodash';

const DB_NAME = 'Payment';

export const savePurchase = (data) => {
    return new Promise((resolve, reject) => {
        const { purchase, isActive, platform } = data;
        db = realm.current();
        
        try {
            let _id = _.get(data, ['_id']);
            if (!_id) { _id = guid(); }

            db.write(() => {
                db.create(DB_NAME, {
                    _id: _id,
                    purchase: purchase,
                    isActive: isActive,
                    platform: platform
                },
                    true
                );
            });

            resolve();
        } catch (error) {
            debugger;
            console.log(error);

            reject(error);
        }
    });
}

export const getCurrentPaymentInfo = () => {
    let db = realm.current();

    try {
        let paymentData = Array.from(db.objects(DB_NAME));
        if (paymentData && paymentData.length > 0) {
            let paymentInfo = Object.assign({}, _.head(paymentData));
            return paymentInfo;
        }

        return null;
    } catch (error) {
        debugger;
        console.log(error);
    }
}

export const deletePaymentInfo = () => {
    db = realm.current();

    try {
        db.write(() => {
            let paymentData = db.objects(DB_NAME);

            db.delete(paymentData);
        })
    } catch (error) {
        debugger;
        console.log(error);
    }
}