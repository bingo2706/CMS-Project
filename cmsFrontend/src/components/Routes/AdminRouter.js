import Dashboard from '../../pages/dashboard/index';

import User from '../../pages/user/index';
import Project from '../../pages/Project/index';
import AddUser from '../../pages/user/AddUser';

import DetailUser from '../../pages/user/DetailUser';
import TrashPage from '../../pages/Trash/TrashPage';
import { Route, Routes } from 'react-router-dom';
import AddProject from '../../pages/Project/AddProject';
import DetailProject from '../../pages/Project/DetailProject';

function AdminRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/user" element={<User />} />
                <Route path="/user/addUser" element={<AddUser />} />
                <Route path="/user/detail/:id" element={<DetailUser />} />
                <Route path="/project/addProject" element={<AddProject />} />
                <Route path="/project/editProject/:id" element={<AddProject />} />
                <Route path="/project" element={<Project />} />
                <Route path="/project/detail/:id" element={<DetailProject />} />
                <Route path="/trash" element={<TrashPage />} />
            </Routes>
        </>
    );
}
export default AdminRouter;
