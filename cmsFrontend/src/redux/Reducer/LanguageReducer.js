import { LANGUAGE } from '../../utils/constant';
const initState = {
    language: 'vi',
};

const LanguageReducer = (state = initState, action) => {
    switch (action.type) {
        case LANGUAGE.CHANGE_LANGUAGE_SUCCESS:
            return {
                ...state,
                language: action.payload,
            };
        default:
            return state;
    }
};

export default LanguageReducer;
