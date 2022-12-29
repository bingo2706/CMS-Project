import AddProject from '../../features/Project/AddProject';
import { withLayoutAdmin } from '../../hoc/withLayoutAdmin';

function AddProjectPage() {
    return <AddProject />;
}
export default withLayoutAdmin(AddProjectPage);
