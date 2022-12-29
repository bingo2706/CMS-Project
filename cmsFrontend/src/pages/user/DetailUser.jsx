import DetailUser from '../../features/User/DetailUser';
import { withLayoutAdmin } from '../../hoc/withLayoutAdmin';

function DetailUserPage() {
    return <DetailUser />;
}
export default withLayoutAdmin(DetailUserPage);
