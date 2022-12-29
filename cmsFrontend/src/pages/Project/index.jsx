import ManageProject from '../../features/Project/index';
import { withLayoutAdmin } from '../../hoc/withLayoutAdmin';

function ManageProjectPage() {
    return <ManageProject />;
}
export default withLayoutAdmin(ManageProjectPage);
