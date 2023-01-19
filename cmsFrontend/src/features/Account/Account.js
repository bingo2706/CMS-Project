import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/common/HeaderList';
import { useEffect, useState } from 'react';
import { getAllAccount } from '../../services/paymentService';
import { DataGrid } from '@mui/x-data-grid';
function Account() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataAccount, setdataAccount] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    useEffect(() => {
        fetchAccount();
    }, []);
    const fetchAccount = async () => {
        setisLoading(true);
        let res = await getAllAccount();
        if (res) {
            setisLoading(false);
            setdataAccount(res);
        }
    };
    const columns = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'currency',
            headerName: 'Currency',
        },
        {
            field: 'balance',
            headerName: 'Balance',
            type: 'number',
            flex: 1,
        },
        {
            field: 'reserved',
            headerName: 'Reserved',
            type: 'number',
            flex: 1,
        },
    ];
    return (
        <Box m="20px">
            <Header title="ACCOUNT" subtitle="Managing the Account" />
            <Box display="flex" justifyContent="end"></Box>
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
                    '& .MuiCircularProgress-root': {
                        color: colors.greenAccent[400],
                    },
                }}
            >
                <DataGrid loading={isLoading} checkboxSelection rows={dataAccount} columns={columns} />
            </Box>
        </Box>
    );
}
export default Account;
