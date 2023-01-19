import LanguageReducer from '../../../../redux/Reducer/LanguageReducer';
import { LANGUAGE } from '../../../../utils/constant';
describe('LanguageReducer', () => {
    const initState = {
        language: () => {
            'vi';
        },
    };
    it('CHANGE_LANGUAGE_SUCCESS', () => {
        LanguageReducer(initState, {
            type: LANGUAGE.CHANGE_LANGUAGE_SUCCESS,
            payload: 'vi',
        });
    });
    it('DEFAULT', () => {
        LanguageReducer(initState, {
            type: 'DEFAULT',
        });
    });
});
