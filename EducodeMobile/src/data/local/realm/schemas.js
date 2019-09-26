import Realm from 'realm';

class AppSchema extends Realm.Object {}
AppSchema.schema = {
    name: 'App',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        appMode: 'string?',
        token: 'string?'
    }
}

class UserSchema extends Realm.Object {}
UserSchema.schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        licenseeId: 'string?',
        firstName: 'string?',
        image: 'string?',
        lastName: 'string?',
        locale: 'string',
        rank: 'int',
    }
}

class LoginLogSchema extends Realm.Object {}
LoginLogSchema.schema = {
    name: 'LoginLog',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        userInLoginLog: 'string'
    }
}

class PaymentSchema extends Realm.Object {}
PaymentSchema.schema = {
    name: 'Payment',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        isActive: 'string?',
        purchase: 'string?',
        platform: 'string?'
    }
}

export default new Realm({schema: [UserSchema, LoginLogSchema, AppSchema, PaymentSchema]});