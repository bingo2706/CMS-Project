import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

export default function SubmitLoading({ loading }) {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: 1000000 }} open={loading}>
            <CircularProgress color="redAccent" />
        </Backdrop>
    );
}
