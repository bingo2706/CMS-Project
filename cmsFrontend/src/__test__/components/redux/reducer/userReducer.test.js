import UserReducer from '../../../../redux/Reducer/UserReducer';
import { USER } from '../../../../utils/constant';
describe('UserReducer', () => {
    const initState = {
        dataUser: {},
    };
    it('LOGIN_SUCCESS', () => {
        UserReducer(initState, {
            type: USER.LOGIN_SUCCESS,
            payload: {
                email: 'test',
                firstName: 'test',
            },
        });
    });
    it('LOGOUT_SUCCESS', () => {
        UserReducer(initState, {
            type: USER.LOGOUT_SUCCESS,
        });
    });
    it('DEFAULT CASE', () => {
        UserReducer(initState, {
            type: 'DEFAULT',
        });
    });
});
