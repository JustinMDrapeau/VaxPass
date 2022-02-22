import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Card, Container, Grid, IconButton, Stack, Toolbar, Typography, TextField } from '@mui/material';
import VaccineCard from './VaccineCard';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import UserDataService from '../services/UserDataService';
import Cookies from 'universal-cookie';

function PatientPage() {
  console.log("Patient Page")
  const cookies = new Cookies();

  const [walletAddress, setWalletAddress] = useState(cookies.get('walletAddress'))
  const [tokens, setToken] = useState([])

  console.log(cookies.get('firstName'))
  console.log(cookies.get('lastName'))
  console.log(cookies.get('birthday'))
  console.log(cookies.get('walletAddress'))

  useEffect(() => {
    UserDataService.getUserTokens(walletAddress).then((response) => {
      setToken(response)
      console.log(response)
    })
  },[])
  return (
    <>
          <div className="PatientPage" style={{backgroundColor: '#D3D3D3'}} >
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
        </Toolbar>
      </AppBar>
    </Box>
      <Box style={{height: '100%'}}>
        <Grid container spacing={2} style={{height: '80%'}}>
          <Grid item xs={4} style={{height: '100%'}}>
      <Container sx={{ pt: '36px'}} style={{height: '100%'}}>
        <Card style={{ padding: '24px', height: '100%'}}> 
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h2" align="center" >
            {cookies.get('firstName')} {cookies.get('lastName')}
            </Typography>
            <Typography variant="h6" align="center" >
              {cookies.get('walletAddress')}
            </Typography>
            <Typography variant="h6" align="center" >
              {cookies.get('birthday')}
            </Typography>
          </Stack>
        </Card>
      </Container>
          </Grid>
          <Grid item xs={8}>
      <Container sx={{ pt: '36px'}}>
            <Box display='flex' mb={2}>
              <Typography variant='h4'>My vaccinations</Typography>
            </Box>
            <Box display='flex'  sx={{ flexWrap: 'wrap' }}>
              {tokens.map((token, index) => {
                return <VaccineCard key={index} token={token}/>
              } )}
            </Box>
      </Container>
          </Grid>
        </Grid>
      </Box>
    </div>
    </>
  );
}

export default PatientPage;
