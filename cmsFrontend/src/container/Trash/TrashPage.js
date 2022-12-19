import { Box, Button, Typography, useTheme } from '@mui/material';
import Header from '../../components/Header';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { getAllUsers, RestoreUserService, DeleteUserService } from '../../services/userService';
import { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import ModalDeleteUser from '../user/ModalDeleteUser';
import RestoreIcon from '@mui/icons-material/Restore';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function TrashPage() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataUser, setdataUser] = useState([]);
    const [arrUserId, setarrUserId] = useState([]);
    const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
    useEffect(() => {
        fetchUser();
    }, []);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        if (newValue === 0) {
            fetchUser();
        } else {
        }
        setValue(newValue);
    };
    const fetchUser = async () => {
        let res = await getAllUsers({
            limit: 10,
            offset: 0,
            keyword: '',
            isDeleted: 1,
        });
        if (res && res.errCode === 0) {
            res.data = res.data.map((item) => {
                return {
                    ...item,
                    roleName: item.roleData.value,
                };
            });
            setdataUser(res.data);
        }
    };
    const handleRestore = async (id) => {
        let res = await RestoreUserService({ id: id });
        if (res && res.errCode === 0) {
            toast.success('Restore user successfully !');
            fetchUser();
        }
    };
    const handleClose = (isOpen) => {
        setisOpenDeleteModal(isOpen);
    };
    const handleAgree = async (value) => {
        if (value && arrUserId.length > 0) {
            let res = await DeleteUserService(arrUserId);
            if (res && res.errCode === 0) {
                toast.success('Delete user successfully !');
                fetchUser();
                setisOpenDeleteModal(false);
            } else {
                toast.error(res.errMessage);
            }
        } else {
            toast.error('Please choose user to delete !');
            setisOpenDeleteModal(false);
        }
    };
    const columns = [
        {
            field: 'firstName',
            headerName: 'First Name',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            type: 'number',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'phonenumber',
            headerName: 'Phone Number',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'id',
            headerName: 'Action',
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <Button onClick={() => handleRestore(id)} type="submit" color="neutral" variant="contained">
                        <RestoreIcon sx={{ marginRight: 1 }}></RestoreIcon>
                        Restore
                    </Button>
                );
            },
        },
    ];
    const handleHardDeleteUser = () => {
        setisOpenDeleteModal(true);
    };
    return (
        <Box padding={'20px'}>
            <Box display={'flex'} alignItems="center" justifyContent={'space-between'}>
                <Header title="TRASH PAGE" subtitle="Hard delete user will delete forever" />
                <Button onClick={() => handleHardDeleteUser()} color="redAccent" variant="contained" sx={{ marginLeft: 1 }}>
                    <DeleteSweepIcon sx={{ marginRight: 1 }} />
                    Trash empty
                </Button>
            </Box>

            <Box
                sx={{
                    backgroundColor: colors.primary[400],
                    display: 'flex',
                    borderRadius: '5px',
                    height: '600px',
                }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    textColor="secondary"
                    indicatorColor="secondary"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="User" />
                    <Tab label="Project" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Box
                        m="10px 0 0 0"
                        height="75vh"
                        width={'1100px'}
                        sx={{
                            '& .MuiDataGrid-root': {
                                border: 'none',
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: 'none',
                            },
                            '& .name-column--cell': {
                                color: colors.greenAccent[300],
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: colors.blueAccent[700],
                                borderBottom: 'none',
                            },
                            '& .MuiDataGrid-virtualScroller': {
                                backgroundColor: colors.primary[400],
                            },
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: 'none',
                                backgroundColor: colors.blueAccent[700],
                            },
                            '& .MuiCheckbox-root': {
                                color: `${colors.greenAccent[200]} !important`,
                            },
                        }}
                    >
                        <DataGrid
                            onSelectionModelChange={(arrUserId) => {
                                setarrUserId(arrUserId);
                            }}
                            selectionModel={arrUserId}
                            checkboxSelection
                            rows={dataUser}
                            columns={columns}
                        />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
            </Box>
            {isOpenDeleteModal && <ModalDeleteUser handleAgree={handleAgree} open={isOpenDeleteModal} handleClose={handleClose} />}
        </Box>
    );
}
