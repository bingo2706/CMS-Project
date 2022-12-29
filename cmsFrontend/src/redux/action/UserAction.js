import { USER } from "../../utils/constant";

export const HandleLoginStart = (data) =>{
    return async (dispatch, getState) => {
        try {
            dispatch(HandleLoginSuccess(data));
        } catch (error) {
            console.log(error);
        }
    };
}
export const HandleLoginSuccess = (data) => {
    return {
        type: USER.LOGIN_SUCCESS,
        payload: data,
    };
};
