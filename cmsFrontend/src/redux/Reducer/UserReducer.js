import { USER } from '../../utils/constant';
const initState = {
    dataUser: {},
    
};

const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case USER.LOGIN_SUCCESS:
            console.log(action)
            return {
                ...state,
                dataUser: action.payload,
            };
       
        default:
            return state;
    }
};

export default UserReducer;
