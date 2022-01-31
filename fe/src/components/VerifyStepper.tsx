import PropTypes from 'prop-types';
import { Box, Step, Stepper, StepLabel } from '@mui/material';

function VerifyStepper(props: any) {
    const { step } = props

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={step} alternativeLabel>
                <Step>
                    <StepLabel />
                </Step>

                <Step>
                    <StepLabel />
                </Step>

                <Step>
                    <StepLabel />
                </Step>
            </Stepper>
        </Box>
    )
}

VerifyStepper.propTypes = {
    step: PropTypes.number.isRequired
};

export default VerifyStepper;