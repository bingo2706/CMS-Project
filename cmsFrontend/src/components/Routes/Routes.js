import LoginPage from '../../pages/Login/LoginPage';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';
import AdminRouter from '../../components/Routes/AdminRouter';
import HomePage from '../../pages/Home';
export default function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/admin/*"
                element={
                    <PrivateRoute>
                        <AdminRouter />
                    </PrivateRoute>
                    // <AdminRouter />
                }
            />
        </Routes>
    );
}
