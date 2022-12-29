import AddUser from '../../features/User/AddUser';
import { withLayoutAdmin } from '../../hoc/withLayoutAdmin';

function AddUSer() {
    return <AddUser />;
}
export default withLayoutAdmin(AddUSer);
