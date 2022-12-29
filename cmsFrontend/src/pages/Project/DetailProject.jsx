import DetailProject from '../../features/Project/DetailProject';
import { withLayoutAdmin } from '../../hoc/withLayoutAdmin';

function DetailProjectPage() {
    return <DetailProject />;
}
export default withLayoutAdmin(DetailProjectPage);
