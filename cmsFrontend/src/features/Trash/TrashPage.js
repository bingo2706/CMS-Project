import { Box, Button, Typography, useTheme } from '@mui/material';
import Header from '../../components/common/HeaderList';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { getAllUsers, RestoreUserService, DeleteUserService } from '../../services/userService';
import { RestoreProjectService, DeleteProjectService } from '../../services/projectService';
import { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import ModalDelete from '../../components/common/ModalDelete';
import RestoreIcon from '@mui/icons-material/Restore';
import { PROJECT } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
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

function TrashPage() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataUser, setdataUser] = useState([]);
    const [arrUserId, setarrUserId] = useState([]);
    const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
    const [isOpenDeleteProjectModal, setisOpenDeleteProjectModal] = useState(false);
    const [arrProjectId, setarrProjectId] = useState([]);
    let dataProject = useSelector((state) => state.ProjectReducer.dataProjectTrash);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchUser();
        dispatch({
            type: PROJECT.GET_ALL_PROJECT_START,
            payload: {
                limit: '',
                offset: '',
                keyword: '',
                isDeleted: 1,
            },
        });
    }, [dispatch]);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        if (newValue === 0) {
            fetchUser();
        } else {
            dispatch({
                type: PROJECT.GET_ALL_PROJECT_START,
                payload: {
                    limit: '',
                    offset: '',
                    keyword: '',
                    isDeleted: 1,
                },
            });
        }
        setValue(newValue);
    };
    const fetchUser = async () => {
        let res = await getAllUsers({
            limit: '',
            offset: '',
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
    const handleRestoreProject = async (id) => {
        let res = await RestoreProjectService({ id: id });
        if (res && res.errCode === 0) {
            toast.success('Restore project successfully !');
            dispatch({
                type: PROJECT.GET_ALL_PROJECT_START,
                payload: {
                    limit: '',
                    offset: '',
                    keyword: '',
                    isDeleted: 1,
                },
            });
            dispatch({
                type: PROJECT.GET_ALL_PROJECT_START,
                payload: {
                    limit: '',
                    offset: '',
                    keyword: '',
                    isDeleted: 0,
                },
            });
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
    const handleCloseProject = (isOpen) => {
        setisOpenDeleteProjectModal(isOpen);
    };
    const handleAgreeProject = async (value) => {
        if (value && arrProjectId.length > 0) {
            let res = await DeleteProjectService(arrProjectId);
            if (res && res.errCode === 0) {
                toast.success('Delete Project successfully !');
                dispatch({
                    type: PROJECT.GET_ALL_PROJECT_START,
                    payload: {
                        limit: '',
                        offset: '',
                        keyword: '',
                        isDeleted: 1,
                    },
                });
                setisOpenDeleteProjectModal(false);
            } else {
                toast.error('Delete project failed !');
            }
        } else {
            toast.error('Please choose project to delete !');
            setisOpenDeleteProjectModal(false);
        }
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
    const columnsProject = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'startDate',
            headerName: 'Start date',
        },
        {
            field: 'endDate',
            headerName: 'End date',
            flex: 1,
        },
        {
            field: 'statusName',
            headerName: 'Status',
            flex: 1,
        },
        {
            headerName: 'Action',
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <Button onClick={() => handleRestoreProject(id)} type="submit" color="neutral" variant="contained">
                        <RestoreIcon sx={{ marginRight: 1 }}></RestoreIcon>
                        Restore
                    </Button>
                );
            },
        },
    ];
    const handleHardDelete = () => {
        if (value === 0) {
            setisOpenDeleteModal(true);
        } else {
            setisOpenDeleteProjectModal(true);
        }
    };
    return (
        <Box padding={'20px'}>
            <Box display={'flex'} alignItems="center" justifyContent={'space-between'}>
                <Header title="TRASH PAGE" subtitle="Hard delete user will delete forever" />
                <Button onClick={() => handleHardDelete()} color="redAccent" variant="contained" sx={{ marginLeft: 1 }}>
                    <DeleteSweepIcon sx={{ marginRight: 1 }} />
                    Trash empty
                </Button>
            </Box>

            <Box
                sx={{
                    backgroundColor: colors.primary[400],
                    display: 'flex',
                    borderRadius: '5px',
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

                <Box width={value === 0 ? '100%' : '0%'}>
                    <TabPanel value={value} index={0}>
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
                            />
                        </Box>
                    </TabPanel>
                </Box>
                <Box width={value === 1 ? '100%' : '0%'}>
                    <TabPanel value={value} index={1}>
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
                                onSelectionModelChange={(arrProjectId) => {
                                    setarrProjectId(arrProjectId);
                                }}
                                selectionModel={arrProjectId}
                                checkboxSelection
                                rows={dataProject}
                                columns={columnsProject}
                            />
                        </Box>
                    </TabPanel>
                </Box>
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
            {isOpenDeleteProjectModal && (
                <ModalDelete
                    content={'The project deletion can still be restored in the recycle bin. Please be careful'}
                    title={'Are you sure you want to delete the project?'}
                    handleAgree={handleAgreeProject}
                    open={isOpenDeleteProjectModal}
                    handleClose={handleCloseProject}
                />
            )}
        </Box>
    );
}
export default TrashPage;
