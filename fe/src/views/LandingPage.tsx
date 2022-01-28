import { useState } from 'react';
import { Button, Card, Container, Stack, Typography } from '@mui/material';
import LogInDialog from '../components/LogInDialog';
import PropTypes from 'prop-types';

function LandingPage(props : any) {
  const { isDialogOpen } = props;
  const [open, setOpen] = useState(isDialogOpen);
  const [isUser, setIsUser] = useState(false);

  const handleClickOpenUser = () => {
    setIsUser(true);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsUser(false);
  };

  return (
    <div className="LandingPage" style={{backgroundColor: '#D3D3D3', height: '100vh' }}>
      <Container maxWidth='xs' sx={{ pt: '192px'}}>
        <Card style={{ padding: '24px'}}> 
          <Stack alignItems="center" spacing={4}>
            <Typography variant="h2" align="center" >
              VaxPass
            </Typography>
            <Typography align="center" >
              What kind of user are you?
            </Typography>
            <Stack spacing={3} width="50%">
              <Button variant="contained" onClick={handleClickOpenUser}>PATIENT</Button>
              <Button variant="contained" onClick={handleClickOpen}>CLINIC</Button>
              <Button>SCAN QR</Button>
            </Stack>
          </Stack>
        </Card>
      </Container>

      <LogInDialog
        isUser={isUser}
        onClose={handleClose}
        isOpen={open}
      />
    </div>
  );
}

LandingPage.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired
};

export default LandingPage;