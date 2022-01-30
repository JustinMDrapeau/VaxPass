import React from 'react';
import { AppBar, Box, Button, Card, Container, CssBaseline, Grid, IconButton, Stack, styled, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import LogInDialog from '../components/LogInDialog';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export default function ClinicMainPage() {


  const [vaccineTypeErrorMessage, setVaccineTypeErrorMessage] = React.useState("");
  const handleVaccineTypeChange = (e: any) => {
    console.log(e.target.value)
    // if(isValidName(e.target.value) === true) {
    //   setFirstName(e.target.value)
    //   setFirstNameErrorMessage("")
    // } else {
    //   setFirstNameErrorMessage("Please enter a valid vaccine type.")
    // }
  }

  const [healthCardErrorMessage, setHealthCardErrorMessage] = React.useState("");
  const handleHealthCardChanged = (e: any) => {
    console.log(e.target.value)
    // if(isValidName(e.target.value) === true) {
    //   setFirstName(e.target.value)
    //   setFirstNameErrorMessage("")
    // } else {
    //   setFirstNameErrorMessage("Please enter a valid vaccine type.")
    // }
  }


  return (
    <div className="UserSignUp" style={{backgroundColor: '#D3D3D3', height: '100vh' }} >
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MedicalServicesIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Clinic Page
          </Typography>
          <Button color="inherit">Verify</Button>
        </Toolbar>
      </AppBar>
    </Box>

      <Box style={{height: '83%'}}>
        <Grid container spacing={2} style={{height: '100%'}} >
          <Grid item xs={4} style={{height: '100%'}}>
      <Container sx={{ pt: '36px'}} style={{height: '100%'}}>
        <Card style={{ backgroundColor: '#101F33', color: 'white', padding: '24px', paddingTop: '30vh', paddingBottom: '25vh'}}> 
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h3" align="center" >
              Clinic Name
            </Typography>
            <Typography variant="h5" align="center" >
              Wallet Address: 
            </Typography>
            <Typography variant="body1" align="center" >
            0x309b99ac0CF5B956cdf5D2d1DebFEc
            </Typography>
            <br/>
            <Typography variant="h5" align="center" >
              Doses Administered: 69
            </Typography>
          </Stack>
        </Card>
      </Container>
          </Grid>
          <Grid item xs={8}>
      <Container sx={{ pt: '36px'}}>
        <Card style={{ padding: '48px', paddingTop: '20vh', paddingBottom: '20vh'}}> 
            <Typography variant="h3" align="left" >
              Assign Vaccine
            </Typography>
            <br/>
            <Typography variant="h6" align="left" >
              Vaccine Type
            </Typography>
          <Stack alignItems="left" spacing={2}>
              <TextField
                required
                error={vaccineTypeErrorMessage!== ""}
                helperText={vaccineTypeErrorMessage}
                id="vaccine-type-field"
                label="Vaccine Type"
                type="text"
                variant="outlined"
                onChange={handleVaccineTypeChange}
              />
            <Typography variant="h6" align="left" >
              Health Card #
            </Typography>
              <TextField
                required
                error={healthCardErrorMessage!== ""}
                helperText={healthCardErrorMessage}
                id="health-card-field"
                label="Health Card #"
                type="text"
                variant="outlined"
                onChange={handleHealthCardChanged}
              />
          <Button variant="contained">Assign</Button>
          </Stack>
        </Card>
      </Container>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
