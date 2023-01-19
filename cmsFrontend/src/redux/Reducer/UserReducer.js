import { USER } from '../../utils/constant';
const initState = {
    dataUser: {},
};

const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case USER.LOGIN_SUCCESS:
            return {
                ...state,
                dataUser: action.payload,
            };
        case USER.LOGOUT_SUCCESS:
            return {
                ...state,
                dataUser: {},
            };
        default:
            return state;
    }
};

export default UserReducer;
