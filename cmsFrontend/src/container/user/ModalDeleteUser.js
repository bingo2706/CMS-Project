import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
export default function ModalDeleteUser(props) {
    const { open } = props;
    const handleClose = () => {
        props.handleClose(false);
    };
    const handleAgree = () => {
        props.handleAgree(true);
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete the user?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The user deletion can still be restored in the recycle bin. Please be careful
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="redAccent" style={{ fontWeight: 700, fontSize: '14px' }}>
                        Cancle
                    </Button>
                    <Button onClick={handleAgree} color="secondary" style={{ fontWeight: 700, fontSize: '14px' }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
