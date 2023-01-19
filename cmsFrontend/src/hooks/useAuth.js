import auth0 from 'auth0-js';
import { toast } from 'react-toastify';

const auth = new auth0.WebAuth({
    domain: process.env.REACT_APP_DOMAIN,
    clientID: process.env.REACT_APP_CLIENT_ID,
    response_type: 'token',
});

export default function useAuth() {
    function login(email, password) {
        auth.login(
            {
                email,
                password,
                realm: 'Username-Password-Authentication',
                responseType: 'token',
            },
            (e) => {
                toast.error(e.description);
            },
        );
    }
    function getUser() {
        return new Promise((resolve, reject) => {
            auth.parseHash({ hash: window.location.hash }, function (err, authResult) {
                if (err) {
                    console.log('err', err);
                }
                let token = '';
                if (authResult) {
                    token = authResult.accessToken;
                    localStorage.setItem('accessToken', authResult.accessToken);
                } else {
                    token = localStorage.getItem('accessToken');
                }
                auth.client.userInfo(token, function (err, user) {
                    resolve(user);
                });
            });
        });
    }
    return { login, getUser };
}
