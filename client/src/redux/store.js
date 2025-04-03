import userReducer from './user/userSlice.js';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/lib/persistStore';
import storage from 'redux-persist/lib/storage';
import themeReducer from './theme/themeSlice.js';
import { theme } from 'flowbite-react';

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,

})

const persistConfig = {
    key: 'root',
    storage,
    version:1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);