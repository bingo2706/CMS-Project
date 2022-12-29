import LoginPage from '../../pages/Login/LoginPage';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';
import AdminRouter from '../../components/Routes/AdminRouter';
export default function MyRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/admin/*"
                element={
                    <PrivateRoute>
                        <AdminRouter />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}
