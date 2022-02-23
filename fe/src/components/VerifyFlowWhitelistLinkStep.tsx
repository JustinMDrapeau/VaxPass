import PropTypes from 'prop-types';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import VerifyStepper from '../components/VerifyStepper';
import WhiteListTextField from './WhiteListTextField';

function VerifyFlowWhitelistLinkStep(props: any) {
    const {
        isOpen,
        whiteListLinks,
        updateWhiteListLink,
        handleNext,
        handleClose,
        handleAddField,
        handleRemoveField,
        isVerifyFlow,
        handleSubmit
    } = props;

    return (
        <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
            {/* @ts-ignore */}
            <DialogTitle align="center" >
                {isVerifyFlow &&
                    <VerifyStepper
                        step={0}
                    />
                }
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: 0, marginTop: 2 }}>
                <Stack spacing={3}>
                    {/* @ts-ignore */}
                    <Typography variant="h7" align="center" >
                        Enter the URL of your establishment's vaccine whitelist:
                    </Typography>
                    <WhiteListTextField
                        whitelistLinkDetails={whiteListLinks}
                        handleAdd={handleAddField}
                        handleRemove={handleRemoveField}
                        updateWhiteListLinksDetails={updateWhiteListLink} />
                    <Alert severity="info">Leave the field empty to consider vaccines from all clinics</Alert>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 3, paddingBottom: 2, align: "justify", marginTop: 2 }}>
                <Button onClick={handleClose}>CANCEL</Button>
                {isVerifyFlow ?
                    <Button variant="contained" onClick={handleNext}>NEXT</Button> :
                    <Button variant="contained" onClick={handleSubmit}>SUBMIT</Button>
                }
            </DialogActions>
        </Dialog>
    )
}

VerifyFlowWhitelistLinkStep.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    whiteListLinks: PropTypes.array.isRequired,
    updateWhiteListLink: PropTypes.func.isRequired,
    handleNext: PropTypes.func,
    handleClose: PropTypes.func.isRequired,
    handleAddField: PropTypes.func.isRequired,
    handleRemoveField: PropTypes.func.isRequired,
    isVerifyFlow: PropTypes.bool,
    handleSubmit: PropTypes.func
};

VerifyFlowWhitelistLinkStep.defaultProps = {
    isVerifyFlow: true,
    handleNext: () => null,
    handleSubmit: () => null
}

export default VerifyFlowWhitelistLinkStep;