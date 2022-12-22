import { Box, useTheme, Typography } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { getDetailProjectById } from '../../services/userService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { FORMAT } from '../../utils/constant';
export default function DetailProject() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataProject, setdataProject] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetchDetailProject(id);
    }, [id]);
    const fetchDetailProject = async (id) => {
        let res = await getDetailProjectById(id);
        if (res && res.errCode === 0) {
            console.log(res.data);
            setdataProject(res.data);
        }
    };
    const renderInfoLine = (label, value) => {
        if (Array.isArray(value) === true) {
            value = value.map((item) => {
                return item.data.firstName + ' ' + item.data.lastName;
            });
        }
        return (
            <Box display={'flex'} alignItems="center" justifyContent={'space-between'} padding="0px 20px 0 10px">
                <Typography variant="h5" color={colors.grey[100]}>
                    {label}
                </Typography>
                <Typography variant="h5" color={colors.grey[100]}>
                    {Array.isArray(value) === true ? value.toString().replace(',', ', ') : value}
                </Typography>
            </Box>
        );
    };
    return (
        <Box m="20px">
            <Header title="DETAIL PROJECT" subtitle="View detail and update information" />
            <Box display="flex" width={'100%'} gap="20px" flexDirection={'column'}>
                <Box backgroundColor={colors.primary[400]} width="25%" display="flex" flexDirection={'column'} flex={2} padding="10px">
                    <Box display={'flex'} alignItems="center" justifyContent={'space-between'} padding="10px 10px 20px 10px">
                        <Typography variant="h4" color={colors.grey[100]} fontWeight="bold">
                            Project Info
                        </Typography>
                    </Box>
                    {renderInfoLine('Name', dataProject.name)}
                    {renderInfoLine('Status', dataProject && dataProject.statusProjectData && dataProject.statusProjectData.value)}
                    {renderInfoLine('Start date', moment(dataProject.startDate).format(FORMAT.FORMAR_DATE))}
                    {renderInfoLine('End date', moment(dataProject.endDate).format(FORMAT.FORMAR_DATE))}
                </Box>
                <Box backgroundColor={colors.primary[400]} display="flex" flexDirection={'column'} flex={2} padding="10px">
                    <Box display={'flex'} alignItems="center" justifyContent={'space-between'} padding="10px 10px 20px 10px">
                        <Typography variant="h4" color={colors.grey[100]} fontWeight="bold">
                            Description
                        </Typography>
                    </Box>
                    <Typography
                        dangerouslySetInnerHTML={{ __html: dataProject.contentHTML }}
                        variant="h5"
                        color={colors.grey[100]}
                        padding="0 0 0 10px"
                    ></Typography>
                </Box>
            </Box>
        </Box>
    );
}
