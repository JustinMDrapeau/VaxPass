import PropTypes from 'prop-types';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../services/UserDataService';
import {sha256} from 'js-sha256';
import Cookies from 'universal-cookie';

function ConfirmUserInformationPopup(props : any) {
    const { firstName, lastName, birthday, isOpen, onClose } = props;

    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleClose = () => {
        onClose()
    };

    const computeHash = () => {
        const hashValue = `${firstName}-${lastName}-${birthday
          ?.toISOString()
          .slice(0, 10)}`;
        return sha256(hashValue);
    };

    const handleSubmit = () => {
        // Create a wallet address
        const keyPairs = UserDataService.createAccount();
        const patientPublic = keyPairs[0]
        const patientPrivate = keyPairs[1]
        // Compute hash
        const hash = computeHash();
        // Insert hash in walletIdToPatientHash map in the smart contract
        UserDataService.setPatientHash(patientPublic, patientPrivate, hash)
            .then((res) => {
                console.log(res)
                console.log("Patient account created")
            })
        // Set cookies
        cookies.set('firstName', firstName, { path: '/patient-page' });
        cookies.set('lastName', lastName, { path: '/patient-page' });
        cookies.set('birthday', birthday, { path: '/patient-page' });
        cookies.set('walletAddress', patientPublic, { path: '/patient-page' });

        // Direct to patient page
        navigate('/patient-page')
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