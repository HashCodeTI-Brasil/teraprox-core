import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import globalConfigReducer from './Reducers/default-reducers/globalConfigReducer';
import globalErrorReducer from './Reducers/default-reducers/globalErrorReducer';
import notificationReducer from './Reducers/default-reducers/notificationReducer';
import asyncResponseReducer from './Reducers/default-reducers/asyncResponseReducer';

const PERSIST_KEY = 'teraprox-core-root';

const cleanupLegacyPersistKey = () => {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.removeItem('persist:root');
    } catch (_) {
    }
};

cleanupLegacyPersistKey();

const staticReducers = {
    global: globalConfigReducer,
    errors: globalErrorReducer,
    notification: notificationReducer,
    asyncResponse: asyncResponseReducer,
};

function createReducer(asyncReducers = {}) {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    });
}

const persistConfig = {
    key: PERSIST_KEY,
    storage,
    whitelist: ['global'],
};

const persistedReducer = persistReducer(persistConfig, createReducer());

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

store.asyncReducers = {};

store.injectReducer = (key, asyncReducer) => {
    if (store.asyncReducers[key]) return;
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(persistReducer(persistConfig, createReducer(store.asyncReducers)));
};

store.unmountReducer = (key) => {
    if (store.asyncReducers[key]) {
        delete store.asyncReducers[key];
        store.dispatch({ type: 'eraseReducer', payload: key });
        store.replaceReducer(persistReducer(persistConfig, createReducer(store.asyncReducers)));
    }
};

export const persistor = persistStore(store);
