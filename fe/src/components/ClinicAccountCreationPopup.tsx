import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Cookies from 'universal-cookie';

function ClinicAccountCreationPopup(props : any) {
    const { clinicName, address, email, publicAddress, privateAddress, isOpen } = props;

    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleSubmit = () => {
        cookies.set('clinicPublic', publicAddress);
        cookies.set('clinicPrivate', privateAddress);

        navigate('/clinic-main-page');
    };

    const handleMail = () => {
        const subject = "VaxPass Clinic Approval Request"
        const body = `To whom it may concern,\n\nOur clinic ${clinicName} would like to be added to your govenment's vaccination approval list. Here is our clinic's information: \n\nClinic Name: ${clinicName}\nClinic Location/Address: ${address}\nClinic Email: ${email}\nPublic Wallet Address: ${publicAddress}\n\nThanks,\n${clinicName}`
        const mailString = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(mailString, '_blank');
    }

    return (
        <Dialog fullWidth maxWidth='md' open={isOpen} >
            <DialogTitle>Account Created Successfully!</DialogTitle>
            <DialogContent sx={{ paddingBottom: 1, paddingTop: 1 }}>
                <Container sx={{ overflowWrap: "break-word"}}>
                    <Typography align="center" >
                        Name: <b>{clinicName}</b>
                    </Typography>
                    <Typography align="center" >
                        Address: <b>{address}</b>
                    </Typography>
                    <Typography align="center" marginBottom="25px" >
                        Email: <b>{email}</b>
                    </Typography>
                    <Typography align="center" marginBottom="25px" >
                        Public Address: <b>{publicAddress}</b>
                    </Typography>
                    <Typography align="center" marginBottom="25px" >
                        Private Address: <b>{privateAddress}</b>
                    </Typography>
                    <Alert severity="warning">Ensure your public and private address are stored securely. They will be needed to access VaxPass in the future. This information cannot be recovered!</Alert>
                </Container>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 3, paddingBottom: 2 }}>
                <Button variant="outlined" onClick={handleMail}>REQUEST GOVERNMENT APPROVAL</Button>
                <Button variant="contained" onClick={handleSubmit}>GO TO DASHBOARD</Button>
            </DialogActions>
        </Dialog>
    )
}

ClinicAccountCreationPopup.propTypes = {
    clinicName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    publicAddress: PropTypes.string.isRequired,
    privateAddress: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default ClinicAccountCreationPopup;
