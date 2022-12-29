import Trash from '../../features/Trash/TrashPage';
import { withLayoutAdmin } from '../../hoc/withLayoutAdmin';

function TrashPage() {
    return <Trash />;
}
export default withLayoutAdmin(TrashPage);
