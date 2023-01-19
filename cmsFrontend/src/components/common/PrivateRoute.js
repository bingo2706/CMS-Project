import { getAccessToken } from '../../services/loginService';
import { getDetailUserByEmail } from '../../services/userService';
import jwt_decode from 'jwt-decode';
import { IDENTITY_PROVIDER, TYPE_LOGIN } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { HandleLoginStart } from '../../redux/action/UserAction';
const qs = require('qs');

export default function PrivateRoute({ children }) {
    const dispatch = useDispatch();
    const url = new URL(window.location.href);
    const code = url.searchParams.get(IDENTITY_PROVIDER.CODE);
    let dataUser = useSelector((state) => state.UserReducer.dataUser);
    let fetchToken = async () => {
        let res = await getAccessToken(
            qs.stringify({
                grant_type: process.env.REACT_APP_GRANT_TYPE,
                code: code,
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                redirect_uri: process.env.REACT_APP_URL_ADMIN,
            }),
        );
        return res;
    };
    if (localStorage.getItem(IDENTITY_PROVIDER.ID_TOKEN)) {
        const expToken = jwt_decode(localStorage.getItem(IDENTITY_PROVIDER.ID_TOKEN)).exp * 1000;

        try {
            if (Date.now() < expToken) {
                if (dataUser && (dataUser.roleId === TYPE_LOGIN.ROLE_ADMIN || dataUser.roleId === TYPE_LOGIN.ROLE_MEMBER)) {
                    return children;
                } else window.location.href = process.env.REACT_APP_URL;
            } else {
                localStorage.removeItem(IDENTITY_PROVIDER.ID_TOKEN);
                localStorage.removeItem(IDENTITY_PROVIDER.ACCESS_TOKEN);
                window.location.href = process.env.REACT_APP_URL;
            }
        } catch (error) {
            window.location.href = process.env.REACT_APP_URL;
        }
        return children;
    } else {
        fetchToken()
            .then(async (res) => {
                localStorage.setItem(IDENTITY_PROVIDER.ID_TOKEN, res.id_token);
                localStorage.setItem(IDENTITY_PROVIDER.ACCESS_TOKEN, res.access_token);

                const sub = jwt_decode(res.id_token).sub;
                let user = await getDetailUserByEmail(sub);
                if (user && user.errCode === 0) {
                    dispatch(HandleLoginStart(user.data));
                    window.location.href = process.env.REACT_APP_URL_ADMIN;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
