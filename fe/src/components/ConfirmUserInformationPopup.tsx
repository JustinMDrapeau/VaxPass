import { useState } from 'react'
import PropTypes from 'prop-types';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import UserDataService from '../services/UserDataService';
import { sha256 } from 'js-sha256';
import Cookies from 'universal-cookie';

function ConfirmUserInformationPopup(props: any) {
    const { firstName, lastName, birthday, isOpen, onClose } = props;
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies();

    const handleClose = () => {
        onClose()
    };

    const computeHash = () => {
        const hashValue = `${firstName.toUpperCase()}-${lastName.toUpperCase()}-${birthday
            ?.toISOString()
            .slice(0, 10)}`;
        return sha256(hashValue);
    };

    const handleSubmit = () => {
        // Create a wallet address
        setLoading(true);
        const keyPairs = UserDataService.createAccount();
        const patientPublic = keyPairs[0]
        const clinicPublic = cookies.get("clinicPublic")
        const clinicPrivate = cookies.get("clinicPrivate")
        // Compute hash
        const hash = computeHash();
        console.log("hash: " + hash)
        // Insert hash in walletIdToPatientHash map in the smart contract
        UserDataService.setPatientHash(patientPublic, clinicPublic, clinicPrivate, hash)
            .then((res) => {
                console.log("Patient account created:")
                console.log(res)
                props.setBirthday(birthday)
                props.setFirstName(firstName)
                props.setLastName(lastName)
                props.setWalletAddress(patientPublic);
                setLoading(false);
                handleClose();
            })
    };

    return (
        <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
            <DialogTitle>Confirm Your Information</DialogTitle>
            <DialogContent sx={{ paddingBottom: 1, paddingTop: 1 }}>
                <Typography align="center" >
                    First Name: <b>{firstName.toLowerCase().charAt(0).toUpperCase()+firstName.slice(1)}</b>
                </Typography>
                <Typography align="center" >
                    Last Name: <b>{lastName.toLowerCase().charAt(0).toUpperCase()+lastName.slice(1)}</b>
                </Typography>
                <Typography align="center" marginBottom="25px" >
                    Birthday: <b>{birthday.toDateString()}</b>
                </Typography>

                <Alert severity="warning">Any mismatch with the information present on your government IDs will prevent you from registering vaccines on your account.</Alert>

            </DialogContent>
            <DialogActions sx={{ paddingRight: 3, paddingBottom: 2 }}>
                <Button onClick={handleClose}>CANCEL</Button>
                <LoadingButton loading={loading} variant="contained" onClick={handleSubmit}>CONFIRM</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

ConfirmUserInformationPopup.propTypes = {
    setBirthday: PropTypes.func.isRequired,
    setFirstName: PropTypes.func.isRequired,
    setLastName: PropTypes.func.isRequired,
    setWalletAddress: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthday: PropTypes.instanceOf(Date).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ConfirmUserInformationPopup;