import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import UserInformationFields from './UserInformationFields';
import VerifyStepper from './VerifyStepper';

function VerifyFlowSubmitWalletAddress(props: any) {
    const { isOpen, 
        handleWalletAddressChange, 
        handleClose, 
        handleFirstNameChange, 
        handleLastNameChange, 
        handleBirthdayChange, 
        handleSubmit, 
        firstNameErrorMessage, 
        lastNameErrorMessage, 
        walletAddressErrorMessage, 
        birthday 
    } = props;
    return (
        <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
            {/* @ts-ignore */}
            <DialogTitle align="center" >
                <VerifyStepper
                    step={2}
                />
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: 0, marginTop: 2 }}>
                <Stack spacing={1}>
                    {/* @ts-ignore */}
                    <Typography variant="h7" paddingBottom="15px">Enter the patient's information:</Typography>
                    <UserInformationFields
                        handleFirstNameChange={handleFirstNameChange}
                        handleLastNameChange={handleLastNameChange}
                        handleBirthdayChange={handleBirthdayChange}
                        firstNameErrorMessage={firstNameErrorMessage}
                        lastNameErrorMessage={lastNameErrorMessage}
                        birthday={birthday}
                    />
                    <TextField
                        required
                        error={walletAddressErrorMessage !== ""}
                        helperText={walletAddressErrorMessage}
                        id="password-field"
                        label="Password"
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
    handleWalletAddressChange: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleFirstNameChange: PropTypes.func.isRequired, 
    handleLastNameChange: PropTypes.func.isRequired, 
    handleBirthdayChange: PropTypes.func.isRequired, 
    handleSubmit: PropTypes.func.isRequired, 
    firstNameErrorMessage: PropTypes.string.isRequired, 
    lastNameErrorMessage: PropTypes.string.isRequired, 
    walletAddressErrorMessage: PropTypes.string.isRequired,
    birthday: PropTypes.instanceOf(Date).isRequired
};

export default VerifyFlowSubmitWalletAddress;