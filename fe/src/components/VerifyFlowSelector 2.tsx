import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, RadioGroup, Radio, Stack, TextField, Typography } from '@mui/material';
import VerifyStepper from '../components/VerifyStepper';

function VerifyFlowSelector(props: any) {
    const { isOpen, handleNext, handleClose, updateIsQR } = props;

    const [value, setValue] = useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
        updateIsQR(e.target.value)
    }

    return (
        <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
            <DialogTitle align="center" >
                <VerifyStepper
                    step={1}
                />
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: 0, marginTop: 2 }}>
                <FormControl component="fieldset" sx={{ textAlign: 'center' }}>
                    <Typography variant="h7" paddingBottom="15px">Select how you want ot identify the patient:</Typography>
                    <RadioGroup
                        aria-label="gender"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                        sx={{ alignContent: 'center' }}
                    >
                        <FormControlLabel value="Qr" control={<Radio />} label="Scan Qr" />
                        <FormControlLabel value="wallet" control={<Radio />} label="Manually enter wallet address" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 3, paddingBottom: 2, align: "justify", marginTop: 2 }}>
                <Button onClick={handleClose}>BACK</Button>
                <Button variant="contained" onClick={handleNext}>NEXT</Button>
            </DialogActions>
        </Dialog>
    )
}

VerifyFlowSelector.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    updateIsQR: PropTypes.func.isRequired
};

export default VerifyFlowSelector;