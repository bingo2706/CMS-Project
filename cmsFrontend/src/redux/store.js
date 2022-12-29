import { configureStore } from '@reduxjs/toolkit';
import LanguageReducer from '../redux/Reducer/LanguageReducer';
import ProjectReducer from './Reducer/ProjectReducer';
import UserReducer from './Reducer/UserReducer'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        LanguageReducer,
        ProjectReducer,
        UserReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export default store;
