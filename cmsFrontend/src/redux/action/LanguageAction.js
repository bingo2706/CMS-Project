import { LANGUAGE } from '../../utils/constant';

export const changeLanguageStart = (country) => {
    return async (dispatch, getState) => {
        try {
            dispatch(changeLanguageSuccess(country));
        } catch (error) {
            console.log(error);
        }
    };
};

export const changeLanguageSuccess = (data) => {
    return {
        type: LANGUAGE.CHANGE_LANGUAGE_SUCCESS,
        payload: data,
    };
};
