import { LANGUAGE, USER_REFERENCE } from '../../utils/constant';
const fetchUserReference = () => {
    let userReference = JSON.parse(localStorage.getItem(USER_REFERENCE.USER_REFERENCE));
    if (userReference && userReference.language) {
        return userReference.language;
    } else {
        return 'vi';
    }
};
const initState = {
    language: fetchUserReference(),
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
