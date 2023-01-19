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
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{props.content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        data-testid="button-cancel"
                        onClick={handleClose}
                        id="button-cancel"
                        color="redAccent"
                        style={{ fontWeight: 700, fontSize: '14px' }}
                    >
                        Cancle
                    </Button>
                    <Button
                        data-testid={'Save'}
                        onClick={handleAgree}
                        id="button-cancel"
                        color="secondary"
                        style={{ fontWeight: 700, fontSize: '14px' }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
