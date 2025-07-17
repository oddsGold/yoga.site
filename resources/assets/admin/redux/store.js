import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice.js';
import userReducer from './users/slice.js';
import roleReducer from './roles/slice.js';
import faqReducer from './faq/slice.js';
import formReducer from './form/slice.js';
import socialLinksReducer from './socialLinks/slice.js';
import programReducer from './program/slice.js';
import mainReducer from './main/slice.js';
import worthReducer from './worth/slice.js';
import getReducer from './get/slice.js';
import downloadReducer from './download/slice.js';
import authorReducer from './author/slice.js';
import learningReducer from './learning/slice.js';
import bonusReducer from './bonus/slice.js';
import dashboardReducer from './dashboard/slice.js';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from './operations.js';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'tfa'],
};

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: persistReducer(authPersistConfig, authReducer),
        user: userReducer,
        role: roleReducer,
        faq: faqReducer,
        form: formReducer,
        socialLinks: socialLinksReducer,
        program: programReducer,
        main: mainReducer,
        worth: worthReducer,
        get: getReducer,
        download: downloadReducer,
        author: authorReducer,
        learning: learningReducer,
        dashboard: dashboardReducer,
        bonus: bonusReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(api.middleware),
    devTools: true,
});

export const persistor = persistStore(store);
