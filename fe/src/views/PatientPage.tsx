import { useCallback, useEffect, useState } from 'react';
import { AppBar, Box, Card, Container, Grid, IconButton, Stack, Toolbar, Typography, Tooltip, useMediaQuery } from '@mui/material';
import { isValidLink } from "../helpers/inputValidationHelpers";
import VaccineCard from './VaccineCard';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import { useParams } from 'react-router-dom'
import UserDataService from '../services/UserDataService';
import PatientInfo from '../types/PatientInfo';
import QRCode from 'react-qr-code'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import WhitelistLinkData from '../types/WhitelistLinkData';
import VerifyFlowWhitelistLinkStep from "../components/VerifyFlowWhitelistLinkStep"
import {useLocation} from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import moment from 'moment';

function PatientPage() {
  const { patientInfo } = useParams()
  const decryptedPatientInfo: PatientInfo = patientInfo === undefined ?
    {
      firstName: "",
      lastName: "",
      birthday: "",
      walletAddress: ""
    } :
    JSON.parse(Buffer.from(patientInfo, 'base64').toString('ascii')) as PatientInfo;

  const { firstName, lastName, birthday, walletAddress } = decryptedPatientInfo

  const url = JSON.stringify(window.location.origin + "/patient-page/" + Buffer.from(JSON.stringify(decryptedPatientInfo)).toString('base64'));

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const state: Array<WhitelistLinkData> = location.state === null ? [{ link: "", errorMessage: ""}] : location.state as WhitelistLinkData[]
  const [whitelistLinks, setWhitelistLinks] = useState<Array<WhitelistLinkData>>(state)
  const [isWhitelistFilterOpen, setIsWhitelistFilterOpen] = useState(false)
  const [tokens, setToken] = useState<any[]>([])
  const [allTokens, setAllTokens] = useState<any[]>([]) // a cached set of the tokens
  const [fetched, setFetched] = useState(false)

  const formattedBirthday = moment(birthday).format('MMMM Do YYYY')

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const getTokens = useCallback(() => {
    if (fetched) {
      console.log("GETTING FROM CACHE")
      setToken(allTokens)
      if (whitelistLinks.length >= 1) {
        fetchWhitelistClinicAddresses()
      }
    } else {
      UserDataService.getUserTokens(walletAddress).then((response) => {
        console.log("GETTING FROM BLOCKCHAIN")
        setToken(response)
        setAllTokens(response)
        console.log("THESE ARE THE TOKENS")
        console.log(response)
        if (whitelistLinks.length >= 1) {
          fetchWhitelistClinicAddresses()
        }
      })
      setFetched(true) // set to true so that we don't query the blockchain anymore
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    getTokens()
  }, [getTokens])


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
    setLoading(false)
    setIsWhitelistFilterOpen(true)
  }

  const handleCloseFilter = () => {
    setIsWhitelistFilterOpen(false)
    setLoading(true)
  }

  const handleSubmitFilter = () => {
    // Do something with whitelistLinks (Justin and Russell's part)
    setIsWhitelistFilterOpen(false)
    getTokens()
    setLoading(true)
  }

  const fetchWhitelistClinicAddresses = () => {
    let addresses : any = []
    let promises : any = []
    console.log("ABOUT TO QUERY ALL ADDRESES")
    for (const url of whitelistLinks){
      if (url.link === "") return;
      console.log("URL IS: ")
      console.log(url)

      promises.push(
      axios.get(url.link)
        .then(res => addresses.push(...res.data.addresses))
        .catch(err => console.log(err)))
    }

    console.log("ABOUT TO EXECUTE ALL")

    Promise.all(promises).then(() => filterTokensUsingWhitelist(addresses))
  }

  /**
   * Go through all of the vaccines that the user has and filter using the whitelisted blockchain addresses
   * @param whitelistAddresses 
   * @returns 
   */
  const filterTokensUsingWhitelist = (whitelistAddresses: any) => {
    console.log("FILTERING THE TOKENS")
    console.log("THE WHITELISTS ARE: ")
    console.log(whitelistAddresses)
    if (whitelistAddresses.length === 0){
      console.log("LENGTH IS 0")
      return;
    } 

    const newTokens = allTokens.filter(token => whitelistAddresses.includes(token.issuer))
    setToken(newTokens)
  }

  return (
    <div className="PatientPage" style={{ width: "100vw" }} >
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
        <Grid container spacing={2} style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row'}}>
          <Grid item xs={isMobile ? undefined : 4} style={{ height: '100%' }}>
            <Container sx={{ pt: '36px' }} style={{ height: '100%' }}>
              <Card style={{ padding: '24px', height: '100%' }}>
                <Stack alignItems="center" spacing={2}>
                  <QRCode value={url} />
                  <Typography variant="h2" align="center" style={{ wordBreak: "break-word" }} >
                    {firstName.charAt(0).toUpperCase() + firstName.toLowerCase().slice(1)} {lastName.charAt(0).toUpperCase() + lastName.toLowerCase().slice(1)}
                  </Typography>
                  <Typography variant="body1" align="center" style={{ wordBreak: "break-word" }} >
                    {walletAddress}
                  </Typography>
                  <Typography variant="h6" align="center" style={{ wordBreak: "break-word" }} >
                    {formattedBirthday}
                  </Typography>
                </Stack>
              </Card>
            </Container>
          </Grid>
          <Grid item xs={isMobile ? undefined : 8}>
            <Grid container justifyContent="space-between" sx={{ pt: '36px' }}>
              <Grid pl={isMobile ? 3 : 0} item xs={4}>
                <Typography variant='h4' textAlign={"left"}> Vaccinations </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h4'>
                  <Tooltip title="Filter">
                    <IconButton onClick={handleClickFilter}>
                      <FilterAltIcon style={(whitelistLinks[0].link.length >= 1) ? {color: "black"}: {color:"slategray"}} fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              direction="column"
              justifyContent="center"
            >
              <Grid item >
                {loading ? (
                  <Box display='flex' justifyContent={isMobile ? "center" : "inherit"} sx={{ flexWrap: 'wrap' }}>
                    {tokens.map((token, index) => {
                      return <VaccineCard key={index} token={token} />
                    })}
                  </Box>
                ) : (
                  <Box display='flex' justifyContent={"center"} sx={{
                    flexWrap: 'wrap',
                    alignItems: { xs: 'center', md: 'flex-start' },
                  }}>
                    <CircularProgress />
                  </Box>
                )
                }

              </Grid>


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
