import DashBoard from '../Dashboard/index';
import { getCountStatusProject } from '../../services/projectService';
import { useState, useEffect } from 'react';
import SubmitLoading from '../../components/common/SubmitLoading';
import { toast } from 'react-toastify';
function DashBoardContainer(props) {
    const [CountStatusOrder, setCountStatusOrder] = useState({});
    const [LoadingSubmit, setLoadingSubmit] = useState(false);
    useEffect(() => {
        fetchCountStatusProject();
    }, []);
    const fetchCountStatusProject = async () => {
        setLoadingSubmit(true);
        let res = await getCountStatusProject();
        if (res && res.errCode === 0) {
            setLoadingSubmit(false);
            setCountStatusOrder(res.data);
        } else {
            toast.error(res.errMessage);
        }
    };
    return (
        <>
            <DashBoard CountStatusOrder={CountStatusOrder} />
            <SubmitLoading loading={LoadingSubmit} />
        </>
    );
}
export default DashBoardContainer;
