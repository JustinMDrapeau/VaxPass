import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Stack,
  styled,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import LogInDialog from "../components/LogInDialog";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    color: 'white',
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'yellow',
      },
    },
  },
})(TextField);




export default function ClinicMainPage(props: any) {
  const [vaccineTypeErrorMessage, setVaccineTypeErrorMessage] =
    React.useState("");

  const [dob, setDob] = React.useState<Date | null>(
    new Date(),
  );
  const [dateAdministered, setDateAdministered] = React.useState<Date | null>(
    new Date(),
  );


  const [clinicPublic, setClinicPublic] = useState(props.publicKey)
  const [clinicPrivate, setClinicPrivate] = useState(props.privateKey)

  const [firstName, setFirstName] = useState<String | null>();
  const [lastName, setLastName] = useState<String | null>();
  const [walletAddress, setWalletAddress] = useState<String | null>();
  const [lotNumber, setLotNumber] = useState<String | null>();
  const [doseNumber, setDoseNumber] = useState<String | null>();

  const [vaccineDisabled, setVaccineDisabled] = useState<boolean| undefined>(true);


  return (
    <div
      className="UserSignUp"
      style={{ backgroundColor: "#D3D3D3", height: "100vh" }}
    >
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Clinic Page
            </Typography>
            <Button color="inherit">Verify Clinic</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box style={{ height: "83%" }}>
        <Grid container spacing={2} style={{ height: "100%" }}>
          <Grid item xs={4} style={{ height: "100%" }}>
            <Container sx={{ pt: "36px" }} style={{ height: "100%" }}>
              <Card
                style={{
                  backgroundColor: "#242424",
                  color: "white",
                  padding: "24px",
                  paddingTop: "5vh",
                  paddingBottom: "10vh",
                  borderRadius: '8px'
                }}
              >
                <Stack alignItems="left" spacing={2}>
                  <br/>

                  <Typography variant="h3" align="center">
                    Clinic Name
                  </Typography>
                  <Typography variant="h5" align="center">
                    Wallet Address:
                  </Typography>
                  <Typography variant="body1" align="center">
                    0x309b99ac0CF5B956cdf5D2d1DebFEc
                  </Typography>
                  <br />
                </Stack>
              </Card>
            </Container>
          </Grid>
          <Grid item xs={8}>
            <Container sx={{ pt: "36px" }}>
              <Card
                style={{
                  padding: "48px",
                  paddingTop: "5vh",
                  paddingBottom: "5vh",
                  borderRadius: '8px'
                }}
              >
              

                <Typography variant="h3" align="left">
                  Verify Patient
                </Typography>

              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
              >
                  <TextField
                    required
                    id="first-name-field"
                    label="First Name"
                    type="text"
                    variant="outlined"
                    onChange={e => setFirstName(e.target.value)}
                  />

                  <TextField
                    required
                    id="last-name-field"
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    onChange={e => setLastName(e.target.value)}
                  />
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>

                          <DesktopDatePicker
          label="Date of Birth"
          inputFormat="MM/dd/yyyy"
          value={dob}
          onChange={setDob}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>

                  <TextField
                    required
                    id="wallet-address-field"
                    label="Wallet Address"
                    type="text"
                    variant="outlined"
                    onChange={e => setWalletAddress(e.target.value)}
                    style={{minWidth: '45%'}}
                  />
                  <Button variant="contained" style ={{minHeight: '53px'}}>Verify Patient</Button>
              </Box>

              <br/>
              <br/>

                <Typography variant="h3" align="left">
                  Assign Vaccine
                </Typography>
                <br />
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
              >
                  <TextField
                    required
                    id="vaccine-product-field"
                    label="Product"
                    type="text"
                    variant="outlined"
                    onChange={e => setWalletAddress(e.target.value)}
                    style={{minWidth: '40%'}}
                    disabled = {vaccineDisabled}
                  />

                  <TextField
                    required
                    id="vaccine-lot-number"
                    label="Lot #"
                    type="text"
                    variant="outlined"
                    onChange={e => setLotNumber(e.target.value)}
                    style={{maxWidth: '20%'}}
                    disabled = {vaccineDisabled}
                  />
          
                  <TextField
                    required
                    id="vaccine-dose-number"
                    label="Dose #"
                    type="text"
                    variant="outlined"
                    onChange={e => setDoseNumber(e.target.value)}
                    style={{maxWidth: '20%'}}
                    disabled = {vaccineDisabled}
                  />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <DesktopDatePicker
                    label="Date Issued"
                    inputFormat="MM/dd/yyyy"
                    onChange={setDateAdministered}
                    value={dateAdministered}
                    renderInput={(params) => <TextField {...params} />}
                    disabled = {vaccineDisabled}
                  />
        </LocalizationProvider>
                  <Button variant="contained" style ={{minHeight: '53px'}}>Assign</Button>
              </Box>

              </Card>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}