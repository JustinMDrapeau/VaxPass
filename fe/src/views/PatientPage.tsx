import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Card, Container, Grid, IconButton, Stack, Toolbar, Typography, TextField, Tooltip } from '@mui/material';
import { isValidLink } from "../helpers/inputValidationHelpers";
import VaccineCard from './VaccineCard';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import UserDataService from '../services/UserDataService';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import WhitelistLinkData from '../types/WhitelistLinkData';
import VerifyFlowWhitelistLinkStep from "../components/VerifyFlowWhitelistLinkStep"
import Cookies from 'universal-cookie';
import axios from 'axios';

function PatientPage() {
  // console.log("Patient Page")
  const cookies = new Cookies();

  const [walletAddress, setWalletAddress] = useState(cookies.get('walletAddress'))
  const [whitelistLinks, setWhitelistLinks] = useState<Array<WhitelistLinkData>>([{ link: "", errorMessage: "" }])
  const [isWhitelistFilterOpen, setIsWhitelistFilterOpen] = useState(false)
  const [tokens, setToken] = useState<any[]>(Array())

  const [whitelistAddresses, setWhitelistAddresses] = useState(Array());

  // console.log(cookies.get('firstName'))
  // console.log(cookies.get('lastName'))
  // console.log(cookies.get('birthday'))
  // console.log(cookies.get('walletAddress'))

  useEffect(() => {
    getTokens()
  }, [])

  const getTokens = () => {
    UserDataService.getUserTokens(walletAddress).then((response) => {
      setToken(response)
      console.log("THESE ARE THE TOKENS")
      console.log(response)
      console.log("WHITELISTLINKS")
      console.log(whitelistLinks)
      if (whitelistLinks.length >= 1) {
        console.log("THIS HAPPENS")
        fetchWhitelistClinicAddresses()
      }
    })
  }

  const updateWhiteListLink = (e: any, index: any) => {
    let newWhiteListLinks: Array<WhitelistLinkData> = [...whitelistLinks]; // an array of whitelist links
    if (isValidLink(e.target.value) === true || e.target.value === "") {
      newWhiteListLinks[index].link = e.target.value;
      newWhiteListLinks[index].errorMessage = "";
      setWhitelistLinks(newWhiteListLinks);
    } else {
      newWhiteListLinks[index].errorMessage = "Please ensure the link is valid";
      setWhitelistLinks(newWhiteListLinks);
    }

    // get the whitelist addresses and store it in the state

  }

  const handleAddWhitelistField = () => {
    setWhitelistLinks([...whitelistLinks, { link: "", errorMessage: "" }])
  }

  const handleRemoveField = (index: any) => {
    let newWhiteListLinks: Array<WhitelistLinkData> = [...whitelistLinks];
    newWhiteListLinks.splice(index, 1);
    setWhitelistLinks(newWhiteListLinks)
  }

  const handleClickFilter = () => {
    setIsWhitelistFilterOpen(true)
  }

  const handleCloseFilter = () => {
    setIsWhitelistFilterOpen(false)
  }

  const handleSubmitFilter = () => {
    // Do something with whitelistLinks (Justin and Russell's part)
    setIsWhitelistFilterOpen(false)
    console.log(whitelistLinks)
    getTokens()
  }

  const fetchWhitelistClinicAddresses = () => {
    console.log("GETTING THE ADDRESSES")
    // axios.get("https://api.npoint.io/febe0ed13744ce28a5a0").then(res => console.log(res)).catch()
    // setWhitelistAddresses(Array())
    let tempArray = Array()
    // whitelistLinks.forEach((url) => {
    for (const url of whitelistLinks){
      if (url.link === "") return;
      axios.get(url.link).then(res => {
        tempArray.push(...res.data.addresses)
        console.log("temp array is: ")
        console.log(tempArray)
        setWhitelistAddresses(tempArray)
        console.log("WHITE LIST ADDRESSES IS: ")
        console.log(whitelistAddresses)
        filterTokensUsingWhitelist(tempArray)})
        .catch(err => console.log(err))
    }

  }

  const filterTokensUsingWhitelist = (vaccines: any) => {
    // check if this vaccine is within the whitelist
    // go through the tokens and filter if they are not in the list
    console.log("FILTERING THE TOKENS")
    if (vaccines.length === 0){
      console.log("LENGTH IS 0")
      return;
    } 
    const newTokens = tokens.filter(token => vaccines.includes(token.issuer))
    setToken(newTokens)
    console.log("THE TOKENS ARE")
    console.log(tokens)
  }

  return (
    <div className="PatientPage" style={{ backgroundColor: '#D3D3D3' }} >
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
              <MedicalServicesIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box style={{ height: '100%' }}>
        <Grid container spacing={2} style={{ height: '80%' }}>
          <Grid item xs={4} style={{ height: '100%' }}>
            <Container sx={{ pt: '36px' }} style={{ height: '100%' }}>
              <Card style={{ padding: '24px', height: '100%' }}>
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
            <Grid container justifyContent="space-between" sx={{ pt: '36px' }}>
              <Grid item xs={4}>
                <Typography variant='h4'> My Vaccinations </Typography>
              </Grid>
              <Grid item xs={3} direction="row-reverse">
                <Typography variant='h4'>
                  <Tooltip title="Filter">
                    <IconButton onClick={handleClickFilter}>
                      <FilterAltIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </Grid>
            </Grid>
            <Grid item >
              <Box display='flex' sx={{ flexWrap: 'wrap' }}>
                {tokens.map((token, index) => {
                  return <VaccineCard key={index} token={token} />
                })}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <VerifyFlowWhitelistLinkStep
        isOpen={isWhitelistFilterOpen}
        whiteListLinks={whitelistLinks}
        updateWhiteListLink={updateWhiteListLink}
        handleClose={handleCloseFilter}
        handleAddField={handleAddWhitelistField}
        handleRemoveField={handleRemoveField}
        isVerifyFlow={false}
        handleSubmit={handleSubmitFilter} />
    </div>);
}

export default PatientPage;
