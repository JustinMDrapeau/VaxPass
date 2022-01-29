import PropTypes from 'prop-types';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

function ConfirmUserInformationPopup(props : any) {
    const { firstName, lastName, birthday, isOpen, onClose } = props;

    const handleClose = () => {
        onClose()
    };

    const handleSubmit = () => {
        // Create Wallet
        // Direct to user page
    };

    return (
        <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
            <DialogTitle>Confirm Your Information</DialogTitle>
            <DialogContent sx={{ paddingBottom: 1, paddingTop: 1 }}>
                <Typography align="center" >
                First Name: <b>{firstName}</b>
                </Typography>
                <Typography align="center" >
                    Last Name: <b>{lastName}</b>
                </Typography>
                <Typography align="center" marginBottom="25px" >
                    Birthday: <b>{birthday.toDateString()}</b>
                </Typography>

                <Alert severity="warning">Any mismatch with the information present on your government IDs will prevent you from registering vaccines on your account.</Alert>

            </DialogContent>
            <DialogActions sx={{ paddingRight: 3, paddingBottom: 2 }}>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button variant="contained" onClick={handleSubmit}>CONFIRM</Button>
            </DialogActions>
        </Dialog>
    )
}

ConfirmUserInformationPopup.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthday: PropTypes.instanceOf(Date).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ConfirmUserInformationPopup;