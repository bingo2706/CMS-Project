import Payment from '../../features/Payment/Payment';
import { withLayoutAdmin } from '../../hoc/withLayoutAdmin';

function PaymentPage() {
    return <Payment />;
}
export default withLayoutAdmin(PaymentPage);
