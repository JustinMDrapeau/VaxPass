import PropTypes from 'prop-types';
import { Alert, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import QRCode from 'react-qr-code'

function PatientSignUpInfo(props: any) {
    const { firstName, lastName, birthday, walletAddress, isOpen, onClose } = props;

    const qrInfo = { firstName, lastName, birthday, walletAddress }
    const url = JSON.stringify(window.location.origin + "/patient-page/" + Buffer.from(JSON.stringify(qrInfo)).toString('base64'));

    const handleClose = () => {
        onClose()
    };

    return (
        <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
            {/* @ts-ignore */}
            <DialogTitle align="center">Success!</DialogTitle>
            <DialogContent sx={{ paddingBottom: 1, paddingTop: 1 }}>
                <Box display="flex" justifyContent="center" paddingBottom={1}>
                    <QRCode size={180} value={url} />
                </Box>
                <Typography align="center" paddingBottom={2}>
                    Passport ID: <b>{walletAddress}</b>
                </Typography>

                <Alert severity="info"> <b>Save your passport ID!</b> You will need it to view your vaccines and your QR code on the platform </Alert>

            </DialogContent>
            <DialogActions sx={{ paddingRight: 3, paddingBottom: 2 }}>
                <Button onClick={handleClose}>DONE</Button>
            </DialogActions>
        </Dialog>
    )
}

PatientSignUpInfo.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthday: PropTypes.instanceOf(Date),
    walletAddress: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default PatientSignUpInfo;