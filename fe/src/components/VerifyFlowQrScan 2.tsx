import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions } from '@mui/material';
import QrReader from 'react-camera-qr'

function VerifyFlowQrScan(props: any) {
    const {handleClose, isOpen, handleScan} = props

    const handleError = err => {
        console.error(err)
      }

    return (
        <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              />
              <DialogActions sx={{ paddingRight: 3, paddingBottom: 2, align: "justify", marginTop: 2 }}>
                <Button onClick={handleClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}

VerifyFlowQrScan.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleScan: PropTypes.func.isRequired
};

export default VerifyFlowQrScan;