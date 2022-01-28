import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, RadioGroup, Radio, Stack, TextField, Typography } from '@mui/material';
import VerifyStepper from './VerifyStepper';
import { isValidWalletAddress } from "../helpers/inputValidationHelpers";

function VerifyFlowSubmitWalletAddress(props: any) {
    const { isOpen, handleNext, handleClose } = props;

    const [walletAddress, setWalletAddress] = useState("")
    const [walletAddressErrorMessage, setWalletAddressErrorMessage] = useState("")

    const handleWalletAddressChange = (e: any) => {
        if (isValidWalletAddress(e.target.value) === true) {
            setWalletAddress(e.target.value)
            setWalletAddressErrorMessage("")
        } else {
            setWalletAddressErrorMessage("Please enter a valid wallet address")
        }
    }

    return (
        <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
            <DialogTitle > //align="center"
                <VerifyStepper
                    step={2}
                />
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: 0, marginTop: 2 }}>
                <Stack spacing={1}>
                    <Typography variant="h7" paddingBottom="15px">Enter the patient's wallet address</Typography>
                    <TextField
                        required
                        error={walletAddressErrorMessage !== ""}
                        helperText={walletAddressErrorMessage}
                        id="wallet-address-field"
                        label="Wallet Address"
                        type="text"
                        variant="filled"
                        onChange={handleWalletAddressChange}
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 3, paddingBottom: 2, align: "justify", marginTop: 2 }}>
                <Button onClick={handleClose}>BACK</Button>
                <Button variant="contained" onClick={handleNext}>SUBMIT</Button>
            </DialogActions>
        </Dialog>
    )
}

VerifyFlowSubmitWalletAddress.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default VerifyFlowSubmitWalletAddress;