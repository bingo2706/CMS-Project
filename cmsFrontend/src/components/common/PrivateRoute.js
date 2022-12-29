import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { TYPE_LOGIN } from '../../utils/constant';
export default function PrivateRoute({ children }) {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const typeLogin = localStorage.getItem(TYPE_LOGIN.TYPE_LOGIN);

    if (typeLogin === TYPE_LOGIN.TRADITIONAL) {
        if (
            JSON.parse(localStorage.getItem(TYPE_LOGIN.USER_DATA)) &&
            JSON.parse(localStorage.getItem(TYPE_LOGIN.USER_DATA)).roleId === TYPE_LOGIN.ROLE_ADMIN
        ) {
            return children ? { ...children } : <Outlet />;
        } else {
            return <Navigate to="/login" replace={true} />;
        }
    }
    if (isLoading === false && typeLogin === TYPE_LOGIN.OAUTH) {
        if (isAuthenticated) {
            localStorage.setItem(
                TYPE_LOGIN.USER_DATA,
                JSON.stringify({
                    firstName: user.given_name,
                    lastName: user.family_name,
                    image: user.picture,
                    email: user.email,
                }),
            );
            return children ? { ...children } : <Outlet />;
        } else {
            return <Navigate to="/login" replace={true} />;
        }
    }
}
