import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormHelperText, RadioGroup, Radio, Typography } from '@mui/material';
import VerifyStepper from '../components/VerifyStepper';

function VerifyFlowSelector(props: any) {
    const { isOpen, updateStep, handleClose, updateIsQR } = props;

    const [selectedValue, setSelectedValue] = useState("")
    const [selectedValueErrorMessage, setSelectedValueErrorMessage] = useState("")

    const handleChange = (e: any) => {
        setSelectedValue(e.target.value)
        updateIsQR(e.target.value)
    }

    const handleNext = () => {
        if (selectedValue === "") {
            setSelectedValueErrorMessage("Please select an option")
        } else {
            setSelectedValueErrorMessage("")
            updateStep()
        }
    }

    return (
        <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
            {/* @ts-ignore */}
            <DialogTitle align="center" >
                <VerifyStepper
                    step={1}
                />
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: 0, marginTop: 2 }}>
                <FormControl component="fieldset" sx={{ textAlign: 'center' }}>
                    {/* @ts-ignore */}
                    <Typography variant="h7" paddingBottom="15px">Select how you want to identify the patient:</Typography>
                    <RadioGroup
                        aria-label="gender"
                        name="controlled-radio-buttons-group"
                        value={selectedValue}
                        onChange={handleChange}
                        sx={{ alignContent: 'center' }}
                    >
                        <FormControlLabel value="QR" control={<Radio />} label="Scan QR" />
                        <FormControlLabel value="wallet" control={<Radio />} label="Manually enter patient's information" />
                    </RadioGroup>
                    <FormHelperText sx={{ color: "red" }}>{selectedValueErrorMessage}</FormHelperText>
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
    updateStep: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    updateIsQR: PropTypes.func.isRequired
};

export default VerifyFlowSelector;