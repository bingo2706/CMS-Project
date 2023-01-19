import { configureStore } from '@reduxjs/toolkit';
import LanguageReducer from '../redux/Reducer/LanguageReducer';
import ProjectReducer from './Reducer/ProjectReducer';
import UserReducer from './Reducer/UserReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const persistCommonConfig = {
    storage,
    stateReconciler: autoMergeLevel2,
};
const userPersistConfig = {
    ...persistCommonConfig,
    key: 'dataUser',
    whitelist: ['dataUser'],
};
const persistedReducer = persistReducer(userPersistConfig, UserReducer);
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: { UserReducer: persistedReducer, LanguageReducer, ProjectReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
