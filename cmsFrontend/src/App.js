import {} from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './container/Login/LoginPage';
import AdminRouter from './container/AdminRouter';
function App() {
    const AdminRouterRender = () => {
        if (JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).roleId === 'R1') {
            return <AdminRouter />;
        } else {
            return <Navigate to="/login" replace={true} />;
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
