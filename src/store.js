import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import globalConfigReducer from './Reducers/default-reducers/globalConfigReducer';
import globalErrorReducer from './Reducers/default-reducers/globalErrorReducer';
import notificationReducer from './Reducers/default-reducers/notificationReducer';

const staticReducers = {
    global: globalConfigReducer,
    errors: globalErrorReducer,
    notification: notificationReducer,
};

function createReducer(asyncReducers = {}) {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    });
}

const persistConfig = {
    key: 'root',
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
