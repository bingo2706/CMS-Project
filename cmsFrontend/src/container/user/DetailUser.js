import { Box, useTheme, Button } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailUserById, UpdateUserService } from '../../services/userService';
import moment from 'moment';
import ModalEditUser from './ModalEditUser';
import { toast } from 'react-toastify';
import { FORMAT } from '../../utils/constant';
const DetailUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataUser, setdataUser] = useState({});
    const { id } = useParams();
    const [isOpen, setisOpen] = useState(false);

    useEffect(() => {
        fetchDetailUser(id);
    }, [id]);
    const fetchDetailUser = async (id) => {
        let res = await getDetailUserById(id);
        if (res && res.errCode === 0) {
            setdataUser(res.data);
        }
    };
    const handleClose = (isOpen) => {
        setisOpen(isOpen);
    };
    const handleUpdateUser = async (data) => {
        let res = await UpdateUserService({
            firstName: data.firstName,
            lastName: data.lastName,
            phonenumber: data.phonenumber,
            dob: data.dob,
            id: id,
        });
        if (res && res.errCode === 0) {
            toast.success('Update user successfully');
            fetchDetailUser(id);
            setisOpen(false);
        } else {
            toast.error(res.errMessage);
        }
    };
    const renderInfoLine = (label, value) => {
        if (Array.isArray(value) === true) {
            value = value.map((item) => {
                return item.data.name;
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
            <Header title="DETAIL USER" subtitle="View detail and update information" />
            <Box display="flex" width={'100%'} gap="20px">
                <Box
                    padding={'20px'}
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection={'column'}
                    flex={3}
                >
                    <img
                        style={{ width: '100px', height: '100px', borderRadius: 10, objectFit: 'cover' }}
                        alt="avatar"
                        src={dataUser.image}
                    ></img>
                    <span style={{ marginTop: '6px' }}>{dataUser.firstName + ' ' + dataUser.lastName}</span>
                    <span>{dataUser.email}</span>
                </Box>
                <Box backgroundColor={colors.primary[400]} display="flex" flexDirection={'column'} flex={2}>
                    <Box display={'flex'} alignItems="center" justifyContent={'space-between'} padding="10px 10px 20px 10px">
                        <Typography variant="h4" color={colors.grey[100]} fontWeight="bold">
                            Personal Detail
                        </Typography>
                        <Button onClick={() => setisOpen(true)} color="secondary" style={{ fontWeight: 700, fontSize: '14px' }}>
                            Edit
                        </Button>
                    </Box>
                    {renderInfoLine('First Name', dataUser.firstName)}
                    {renderInfoLine('Last Name', dataUser.lastName)}
                    {renderInfoLine('Phone Number', dataUser.phonenumber)}
                    {renderInfoLine('Date of birth', moment(dataUser.dob).format(FORMAT.FORMAR_DATE))}
                </Box>
                <Box backgroundColor={colors.primary[400]} display="flex" flexDirection={'column'} flex={2}>
                    <Box display={'flex'} alignItems="center" justifyContent={'space-between'} padding="10px 10px 20px 10px">
                        <Typography variant="h4" color={colors.grey[100]} fontWeight="bold">
                            Project Info
                        </Typography>
                    </Box>
                    {renderInfoLine('Member of', dataUser.projectData)}
                    {renderInfoLine('Role of', dataUser && dataUser.roleData ? dataUser.roleData.value : '')}
                </Box>
            </Box>
            {isOpen && <ModalEditUser handleUpdateUser={handleUpdateUser} data={dataUser} open={isOpen} handleClose={handleClose} />}
        </Box>
    );
};

export default DetailUser;
