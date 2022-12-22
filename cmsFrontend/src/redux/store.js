import { configureStore } from '@reduxjs/toolkit';
import LanguageReducer from '../redux/Reducer/LanguageReducer';
import ProjectReducer from './Reducer/ProjectReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        LanguageReducer,
        ProjectReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export default store;
