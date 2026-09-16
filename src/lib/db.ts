import { collection } from 'firebase/firestore';
import { db } from './firebase';

export const collections = {
    categories: collection(db, 'categories'),
    fundRequests: collection(db, 'fundRequests'),
    logins: collection(db, 'logins'),
    orders: collection(db, 'orders'),
    paymentMethods: collection(db, 'paymentMethods'),
    services: collection(db, 'services'),
    settings: collection(db, 'settings'),
    users: collection(db, 'users'),
};
