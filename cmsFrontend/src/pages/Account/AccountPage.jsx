import Account from '../../features/Account/Account';
import { withLayoutAdmin } from '../../hoc/withLayoutAdmin';

function AccountPage() {
    return <Account />;
}
export default withLayoutAdmin(AccountPage);
