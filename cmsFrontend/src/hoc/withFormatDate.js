import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const withFormatDate = (Component) => (props) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Component />
        </LocalizationProvider>
    );
};
