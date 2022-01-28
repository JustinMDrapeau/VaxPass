import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import VerifyStepper from './VerifyStepper';
import { isValidWalletAddress } from "../helpers/inputValidationHelpers";

function VerifyFlowSubmitWalletAddress(props: any) {
    const { isOpen, updateUserInformation, handleClose } = props;

    const [walletAddress, setWalletAddress] = useState("")
    const [walletAddressErrorMessage, setWalletAddressErrorMessage] = useState("")

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState(today);

    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

    const handleFirstNameChange = (e: any) => {
        if (isValidName(e.target.value) === true) {
            setFirstName(e.target.value)
            setFirstNameErrorMessage("")
        } else {
            setFirstNameErrorMessage("Please enter a valid first name")
        }
    }

    const handleLastNameChange = (e: any) => {
        if (isValidName(e.target.value) === true) {
            setLastName(e.target.value)
            setLastNameErrorMessage("")
        } else {
            setLastNameErrorMessage("Please enter a valid last name")
        }
    }

    const handleBirthdayChange = (e: any) => {
        setBirthday(e)
    }

    const handleWalletAddressChange = (e: any) => {
        if (isValidWalletAddress(e.target.value) === true) {
            setWalletAddress(e.target.value)
            setWalletAddressErrorMessage("")
        } else {
            setWalletAddressErrorMessage("Please enter a valid wallet address")
        }
    }

    const userNoMissingInformation = () => {
        let noMissingInfo = true;

        if (isUser === true) {
            if (firstName === "") {
                setFirstNameErrorMessage("Please enter a first name")
                noMissingInfo = false
            } else if (lastName === "") {
                setLastNameErrorMessage("Please enter a last name")
                noMissingInfo = false
            }
        }

        if (walletAddress === "") {
            setWalletAddressErrorMessage("Please enter a valid address");
            noMissingInfo = false
        }

        return noMissingInfo

    }

    const handleSubmit = () => {
        if (userNoMissingInformation() === true) {
            updateUserInformation()
        }
    };

    return (
        <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
            <DialogTitle align="center" >
                <VerifyStepper
                    step={2}
                />
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: 0, marginTop: 2 }}>
                <Stack spacing={1}>
                    <Typography variant="h7" paddingBottom="15px">Enter the patient's wallet address</Typography>
                    {/* <UserInformationFields
                        handleFirstNameChange={handleFirstNameChange}
                        handleLastNameChange={handleLastNameChange}
                        handleBirthdayChange={handleBirthdayChange}
                        firstNameErrorMessage={firstNameErrorMessage}
                        lastNameErrorMessage={lastNameErrorMessage}
                        birthday={birthday}
                    /> */}
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
                <Button variant="contained" onClick={handleSubmit}>SUBMIT</Button>
            </DialogActions>
        </Dialog>
    )
}

VerifyFlowSubmitWalletAddress.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    updateUserInformation: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default VerifyFlowSubmitWalletAddress;