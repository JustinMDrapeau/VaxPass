import PropTypes from 'prop-types';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import VerifyStepper from '../components/VerifyStepper';

function VerifyFlowWhitelistLinkStep(props: any) {
    const { isOpen, updateWhiteListLink, whitelistLinkErrorMessage, handleNext, handleClose } = props;

    const handleWhitelistLinkChange = (e: any) => {
        updateWhiteListLink(e)
    }

    return (
        <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
            <DialogTitle align="center" >
                <VerifyStepper
                    step={0}
                />
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: 0, marginTop: 2 }}>
                <Stack spacing={3}>
                    <Typography variant="h7" align="center" >
                        Enter the URL of your establishment's vaccine whitelist:
                    </Typography>
                    <TextField
                        error={whitelistLinkErrorMessage !== ""}
                        helperText={whitelistLinkErrorMessage}
                        id="whitelist-link-field"
                        label="Whitelist Link"
                        type="whitelist"
                        variant="filled"
                        onChange={handleWhitelistLinkChange}
                    />

                    <Alert severity="info">Leave the field empty to consider vaccines all clinics</Alert>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 3, paddingBottom: 2, align: "justify", marginTop: 2 }}>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button variant="contained" onClick={handleNext}>NEXT</Button>
            </DialogActions>
        </Dialog>
    )
}

VerifyFlowWhitelistLinkStep.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    updateWhiteListLink: PropTypes.func.isRequired,
    whitelistLinkErrorMessage: PropTypes.string.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default VerifyFlowWhitelistLinkStep;