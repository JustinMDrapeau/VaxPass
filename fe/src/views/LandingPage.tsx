import { useState } from 'react';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import LogInDialog from '../components/LogInDialog';
import VerifyFlow from './VerifyFlow'
import PropTypes from 'prop-types';

function LandingPage(props: any) {
  const { isDialogOpen } = props;
  const [logInIsOpen, setLogInIsOpen] = useState(isDialogOpen);
  const [verifyIsOpen, setVerifyIsOpen] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const handleClickOpenUser = () => {
    setIsUser(true);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setLogInIsOpen(true);
  };

  const handleClose = () => {
    setLogInIsOpen(false);
    setIsUser(false);
  };

  const handleVerifyClose = () => {
    setVerifyIsOpen(false);
  }

  const handleClickVerify = () => {
    setVerifyIsOpen(true);
  };

  return (
    <div className="LandingPage" style={{ backgroundColor: '#D3D3D3', height: '100vh'}}>
      <Box display="flex" alignItems="center" minHeight="100vh">
        <Container maxWidth='xs'>
          <Card style={{ padding: '24px' }}>
            <Stack alignItems="center" spacing={4}>
              <Typography variant="h2" align="center">
                VaxPass
              </Typography>
              <Typography align="center" >
                What kind of user are you?
              </Typography>
              <Stack spacing={3} width="50%">
                <Button variant="contained" onClick={handleClickOpenUser}>PATIENT</Button>
                <Button variant="contained" onClick={handleClickOpen}>CLINIC</Button>
                <Button onClick={handleClickVerify} >VERIFY</Button>
              </Stack>
            </Stack>
          </Card>
        </Container>
      </Box>

      <LogInDialog
        isUser={isUser}
        onClose={handleClose}
        isOpen={logInIsOpen}
      />

      <VerifyFlow
        isOpen={verifyIsOpen}
        handleClose={handleVerifyClose}
      />
    </div>
  );
}

LandingPage.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired
};

export default LandingPage;