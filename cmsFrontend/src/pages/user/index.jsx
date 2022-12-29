import ManageUser from '../../features/User/index';
import { withLayoutAdmin } from '../../hoc/withLayoutAdmin';

function User() {
    return <ManageUser />;
}
export default withLayoutAdmin(User);
