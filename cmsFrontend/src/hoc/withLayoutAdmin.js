import Sidebar from '../layouts/Sidebar';
import Topbar from '../layouts/Topbar';
export const withLayoutAdmin = (Component) => (props) => {
    return (
        <>
            <Sidebar />
            <main className="content">
                <Topbar />
                <Component />
            </main>
        </>
    );
};
