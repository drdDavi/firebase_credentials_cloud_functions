import * as admin from 'firebase-admin';
admin.initializeApp();

export * from './modules/onCreateUser';
export * from './modules/onCreatePassword';
