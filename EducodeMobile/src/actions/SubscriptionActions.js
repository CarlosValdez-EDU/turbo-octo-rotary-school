import {
    SUBSCRIPTION_LOADING,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAIL,
    SUBSCRIPTION_RESET
} from '@constants/Types';
import * as RNIap from 'react-native-iap';
import { Platform, Alert } from 'react-native';
import { verifySubscription } from './AppActions';

export const registerSubscription = (userId, purchaseType) => {
    return (dispatch, getState, { sendCommand }) => {
        return new Promise(async (resolve, reject) => {

            try {
                dispatch({
                    type: SUBSCRIPTION_LOADING
                });
                
                const itemSkus = Platform.select({
                    ios: [
                        "com.educode.lite.monthlysubscription",
                        "com.educode.lite.biannualsubscription",
                        "com.educode.lite.yearlysubscription"
                    ],
                    android: [
                        "educode.1.month.subscription",
                        "educode.6.month.subscription",
                        "educode.1.year.subscription",
                    ]
                });

                const products = await RNIap.getSubscriptions(itemSkus);

                if (products != undefined) {
                    let sku;
                    switch (purchaseType) {
                        case 1:
                            sku = 0;
                            break;
                        case 2:
                            sku = 1;
                            break;
                        case 3:
                            sku = 2;
                            break;
                    }

                    let userData = await RNIap.buySubscription(itemSkus[sku]).then(async (purchase) => {
                        const platformId = Platform.OS === 'ios' ? 1 : 2;
                        let transactionToken = ''
                        switch (Platform.OS) {
                            case 'ios':
                                transactionToken = purchase.transactionReceipt;
                                break;
                            case 'android':
                                const receipt = JSON.parse(purchase.transactionReceipt);
                                transactionToken = receipt.purchaseToken;
                                break;
                        }
                        
                        let data = {
                            platformId,
                            token: transactionToken,
                            userId,
                            purchaseType
                        };

                        return data;
                    }).catch(err => {
                        debugger;
                        dispatch({
                            type: SUBSCRIPTION_FAIL
                        });
                        console.log('_______ERRORPAYMENTS', err);
                        Alert.alert('Error', err.message);
                    });

                    console.log(userData);
                    await dispatch(sendCommand('saveUserPayment', userData));

                    dispatch({
                        type: SUBSCRIPTION_SUCCESS
                    });

                    dispatch(verifySubscription());
                }
            } catch (error) {
                dispatch({
                    type: SUBSCRIPTION_FAIL
                });
                console.log(error);
            } finally {
                resolve();
            }
        });
    }
};

export const resetSubscription = () => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch({
                    type: SUBSCRIPTION_RESET
                });
            } catch (error) {
                console.log(error);
            } finally {
                resolve();
            }
        });
    }
};
