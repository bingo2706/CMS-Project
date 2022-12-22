import { Box, Typography, useTheme, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { getAllUsers, SoftDeleteUserService } from '../../services/userService';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../../components/Header';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ModalDelete from '../../components/ModalDelete';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import { USER_REFERENCE } from '../../utils/constant';
const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataUser, setdataUser] = useState([]);
    const [arrUserId, setarrUserId] = useState([]);
    const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
    const [ColumnVisibilityModel, setColumnVisibilityModel] = useState({});
    useEffect(() => {
        fetchUser();
        fetchUserReference();
    }, []);
    const fetchUserReference = () => {
        let userReference = JSON.parse(localStorage.getItem(USER_REFERENCE.USER_REFERENCE));
        if (userReference) {
            setColumnVisibilityModel(userReference.tableUser);
        }
    };
    const fetchUser = async () => {
        let res = await getAllUsers({
            limit: '',
            offset: '',
            keyword: '',
            isDeleted: 0,
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
    const handleClose = (isOpen) => {
        setisOpenDeleteModal(isOpen);
    };
    const handleAgree = async (value) => {
        if (value && arrUserId.length > 0) {
            let res = await SoftDeleteUserService({
                ids: arrUserId,
                isDeleted: 1,
            });
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
    const handleSoftDeleteUser = () => {
        setisOpenDeleteModal(true);
    };
    const handleOnchangeColumns = (newModel) => {
        let userReference = JSON.parse(localStorage.getItem(USER_REFERENCE.USER_REFERENCE));
        localStorage.setItem(USER_REFERENCE.USER_REFERENCE, JSON.stringify({ ...userReference, tableUser: newModel }));
        setColumnVisibilityModel(newModel);
    };
    const columns = [
        { field: 'id', headerName: 'ID' },
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
            field: 'roleName',
            headerName: 'Role',
            flex: 1,
            renderCell: ({ row: { roleName } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            roleName === 'Admin'
                                ? colors.greenAccent[600]
                                : roleName === 'Member'
                                ? colors.greenAccent[700]
                                : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {roleName === 'Admin' && <AdminPanelSettingsOutlinedIcon />}
                        {roleName === 'Member' && <SecurityOutlinedIcon />}

                        <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                            {roleName}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            headerName: 'Action',
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <Link to={`/admin/user/detail/${id}`} style={{ textDecoration: 'none', color: colors.grey[100] }}>
                        <Button type="submit" color="neutral" variant="contained">
                            <PageviewOutlinedIcon sx={{ marginRight: 1 }} />
                            View
                        </Button>
                    </Link>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the Team Members" />
            <Box display="flex" justifyContent="end">
                <Link to={'/admin/user/addUser'} style={{ textDecoration: 'none' }}>
                    <Button type="submit" color="secondary" variant="contained">
                        <PersonAddOutlinedIcon sx={{ marginRight: 1 }} />
                        Add User
                    </Button>
                </Link>
                <Button onClick={() => handleSoftDeleteUser()} type="submit" color="redAccent" variant="contained" sx={{ marginLeft: 1 }}>
                    <DeleteSweepIcon sx={{ marginRight: 1 }} />
                    Trash
                </Button>
            </Box>
            <Box
                m="10px 0 0 0"
                height="75vh"
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
                    columnVisibilityModel={ColumnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) => handleOnchangeColumns(newModel)}
                />
            </Box>
            {isOpenDeleteModal && (
                <ModalDelete
                    content={'The user deletion can still be restored in the recycle bin. Please be careful'}
                    title={'Are you sure you want to delete the user?'}
                    handleAgree={handleAgree}
                    open={isOpenDeleteModal}
                    handleClose={handleClose}
                />
            )}
        </Box>
    );
};

export default Team;
