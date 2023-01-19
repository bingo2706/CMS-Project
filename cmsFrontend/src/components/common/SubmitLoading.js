import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { Box } from '@mui/material';

const SubmitLoading = ({ loading }) => {
    return (
        <Box>
            <Backdrop sx={{ color: '#fff', zIndex: 1000000 }} open={loading}>
                <CircularProgress color="redAccent" />
            </Backdrop>
        </Box>
    );
};
export default SubmitLoading;
