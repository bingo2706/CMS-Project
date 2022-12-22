import {} from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './container/Login/LoginPage';
import AdminRouter from './container/AdminRouter';
import { useAuth0 } from '@auth0/auth0-react';
import { TYPE_LOGIN } from './utils/constant';
function App() {
    const AdminRouterRender = () => {
        const { user, isAuthenticated, isLoading } = useAuth0();
        const typeLogin = localStorage.getItem(TYPE_LOGIN.TYPE_LOGIN);

        if (typeLogin === TYPE_LOGIN.TRADITIONAL) {
            if (
                JSON.parse(localStorage.getItem(TYPE_LOGIN.USER_DATA)) &&
                JSON.parse(localStorage.getItem(TYPE_LOGIN.USER_DATA)).roleId === TYPE_LOGIN.ROLE_ADMIN
            ) {
                return <AdminRouter />;
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
                return <AdminRouter />;
            } else {
                return <Navigate to="/login" replace={true} />;
            }
        }
    };
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin/*" element={<AdminRouterRender />} />
                    </Routes>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
