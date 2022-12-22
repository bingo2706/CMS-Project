import { Box, useTheme, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Link } from 'react-router-dom';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { PROJECT } from '../../utils/constant';
import ModalDelete from '../../components/ModalDelete';
import { SoftDeleteProjectService } from '../../services/userService';
import { toast } from 'react-toastify';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { USER_REFERENCE } from '../../utils/constant';
const Project = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    let dataProject = useSelector((state) => state.ProjectReducer.dataProject);
    const [arrProjectId, setarrProjectId] = useState([]);
    const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
    const [ColumnVisibilityModel, setColumnVisibilityModel] = useState({});
    useEffect(() => {
        dispatch({
            type: PROJECT.GET_ALL_PROJECT_START,
            payload: {
                limit: '',
                offset: '',
                keyword: '',
                isDeleted: 0,
            },
        });
        fetchUserReference();
    }, [dispatch]);
    const handleClose = (isOpen) => {
        setisOpenDeleteModal(isOpen);
    };
    const fetchUserReference = () => {
        let userReference = JSON.parse(localStorage.getItem(USER_REFERENCE.USER_REFERENCE));
        if (userReference) {
            setColumnVisibilityModel(userReference.tableProject);
        }
    };
    const handleAgree = async (value) => {
        if (value && arrProjectId.length > 0) {
            let res = await SoftDeleteProjectService({
                ids: arrProjectId,
                isDeleted: 1,
            });
            if (res && res.errCode === 0) {
                toast.success('Delete project successfully !');
                dispatch({
                    type: PROJECT.GET_ALL_PROJECT_START,
                    payload: {
                        limit: '',
                        offset: '',
                        keyword: '',
                        isDeleted: 0,
                    },
                });
                setisOpenDeleteModal(false);
            } else {
                toast.error(res.errMessage);
            }
        } else {
            toast.error('Please choose project to delete !');
            setisOpenDeleteModal(false);
        }
    };
    const handleOnchangeColumns = (newModel) => {
        let userReference = JSON.parse(localStorage.getItem(USER_REFERENCE.USER_REFERENCE));
        localStorage.setItem(USER_REFERENCE.USER_REFERENCE, JSON.stringify({ ...userReference, tableProject: newModel }));
        setColumnVisibilityModel(newModel);
    };
    const handleSoftDeleteUser = () => {
        setisOpenDeleteModal(true);
    };
    const columns = [
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
                    <>
                        <Link to={`/admin/project/detail/${id}`} style={{ textDecoration: 'none', color: colors.grey[100] }}>
                            <Button type="submit" color="neutral" variant="contained">
                                <PageviewOutlinedIcon sx={{ marginRight: 1 }} />
                                View
                            </Button>
                        </Link>
                        <Link to={`/admin/project/editProject/${id}`} style={{ textDecoration: 'none', color: colors.grey[100] }}>
                            <Button sx={{ marginLeft: 1 }} type="submit" color="redAccent" variant="contained">
                                <EditOutlinedIcon sx={{ marginRight: 1 }} />
                                Edit
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="PROJECT" subtitle="Managing the Projects" />
            <Box display="flex" justifyContent="end">
                <Link to={'/admin/project/addProject'} style={{ textDecoration: 'none' }}>
                    <Button type="submit" color="secondary" variant="contained">
                        <PersonAddOutlinedIcon sx={{ marginRight: 1 }} />
                        Add Project
                    </Button>
                </Link>
                <Button onClick={handleSoftDeleteUser} type="submit" color="redAccent" variant="contained" sx={{ marginLeft: 1 }}>
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
                    onSelectionModelChange={(arrProjectId) => {
                        setarrProjectId(arrProjectId);
                    }}
                    selectionModel={arrProjectId}
                    checkboxSelection
                    rows={dataProject}
                    columns={columns}
                    columnVisibilityModel={ColumnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) => handleOnchangeColumns(newModel)}
                />
            </Box>
            {isOpenDeleteModal && (
                <ModalDelete
                    content={'The project deletion can still be restored in the recycle bin. Please be careful'}
                    title={'Are you sure you want to delete the project?'}
                    handleAgree={handleAgree}
                    open={isOpenDeleteModal}
                    handleClose={handleClose}
                />
            )}
        </Box>
    );
};

export default Project;
