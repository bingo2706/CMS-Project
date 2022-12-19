import { configureStore } from '@reduxjs/toolkit';
import LanguageReducer from '../redux/Reducer/LanguageReducer';

const store = configureStore({
    reducer: {
        LanguageReducer,
    },
});

export default store;
