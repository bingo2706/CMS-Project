import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Header from '../../components/Header';
import StatBox from '../../components/StatBox';
import { FormattedMessage } from 'react-intl';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="32,441"
                        subtitle={<FormattedMessage id="dashboardPage.NewClients" />}
                        progress="0.30"
                        increase="+5%"
                        icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
