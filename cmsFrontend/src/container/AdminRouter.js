import Dashboard from '../container/dashboard/index';
import Sidebar from '../container/global/Sidebar';
import User from '../container/user/index';
import AddUser from '../container/user/AddUser';
import Topbar from '../container/global/Topbar';
import DetailUser from '../container/user/DetailUser';
import TrashPage from '../container/Trash/TrashPage';
import { Route, Routes } from 'react-router-dom';
import AddProject from './Project/AddProject';
export default function AdminRouter() {
    return (
        <>
            <Sidebar />
            <main className="content">
                <Topbar />

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/user/addUser" element={<AddUser />} />
                    <Route path="/user/detail/:id" element={<DetailUser />} />
                    <Route path="/project/addProject" element={<AddProject />} />
                    <Route path="/trash" element={<TrashPage />} />
                </Routes>
            </main>
        </>
    );
}
