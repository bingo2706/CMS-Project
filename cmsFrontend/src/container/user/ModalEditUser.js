import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { FORMAT } from '../../utils/constant';
export default function ModalEditUser(props) {
    const { open, data } = props;
    const handleClose = () => {
        props.handleClose(false);
    };
    const [inputValues, setInputValues] = useState({
        firstName: data.firstName,
        lastName: data.lastName,
        phonenumber: data.phonenumber,
        dob: data.dob,
    });
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };
    const handleUpdateUser = () => {
        props.handleUpdateUser(inputValues);
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>UPDATE USER</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="First Name"
                        name="firstName"
                        color="secondary"
                        onChange={(e) => handleOnChange(e)}
                        value={inputValues.firstName}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Last Name"
                        name="lastName"
                        color="secondary"
                        onChange={(e) => handleOnChange(e)}
                        value={inputValues.lastName}
                        sx={{ marginTop: '10px' }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Phone Number"
                        name="phonenumber"
                        color="secondary"
                        onChange={(e) => handleOnChange(e)}
                        value={inputValues.phonenumber}
                        sx={{ marginTop: '10px' }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack sx={{ marginTop: '10px' }}>
                            <DesktopDatePicker
                                label="Date of birth"
                                inputFormat={FORMAT.FORMAR_DATE}
                                value={inputValues.dob}
                                name="dob"
                                onChange={(value) => setInputValues({ ...inputValues, dob: value['$d'] })}
                                renderInput={(params) => <TextField color="secondary" fullWidth variant="filled" {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateUser} color="secondary" style={{ fontWeight: 700, fontSize: '14px' }}>
                        Save
                    </Button>
                    <Button onClick={handleClose} color="redAccent" style={{ fontWeight: 700, fontSize: '14px' }}>
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
