import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Header from '../../components/Header';
import StatBox from '../../components/StatBox';
import { FormattedMessage } from 'react-intl';
import { getCountStatusProject } from '../../services/userService';
import { useState, useEffect } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);
let getOptions = (title) => {
    return {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };
};
const Dashboard = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode);
    const [CountStatusOrder, setCountStatusOrder] = useState({});
    useEffect(() => {
        fetchCountStatusProject();
    }, []);
    const fetchCountStatusProject = async () => {
        let res = await getCountStatusProject();
        if (res && res.errCode === 0) {
            setCountStatusOrder(res.data);
        } else {
            toast.error(res.errMessage);
        }
    };
    const dataPie = {
        labels: CountStatusOrder.arrayLable,
        datasets: [
            {
                label: '# of Votes',
                data: CountStatusOrder.arrayValue,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header
                    title={<FormattedMessage id="dashboardPage.dashboard" />}
                    subtitle={<FormattedMessage id="dashboardPage.subtitle" />}
                />
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: '14px',
                            fontWeight: 'bold',
                            padding: '10px 20px',
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: '10px' }} />
                        <FormattedMessage id="dashboardPage.exportReport" />
                    </Button>
                </Box>
            </Box>
            {/* GRID & CHARTS */}
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
                {/* ROW 1 */}
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                    <StatBox
                        title="32,441"
                        subtitle={<FormattedMessage id="dashboardPage.NewClients" />}
                        icon={<AssignmentIndIcon sx={{ color: colors.greenAccent[600], fontSize: '66px' }} />}
                    />
                </Box>
            </Box>
            <Box width={'400px'} sx={{ backgroundColor: colors.primary[400] }} marginTop="10px" borderRadius={5}>
                <Pie data={dataPie} options={getOptions('Thống kê trạng thái')} />
            </Box>
        </Box>
    );
};

export default Dashboard;
