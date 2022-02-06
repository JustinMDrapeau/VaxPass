import React from "react";
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




export default function ClinicMainPage() {
  const [vaccineTypeErrorMessage, setVaccineTypeErrorMessage] =
    React.useState("");

  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleVaccineTypeChange = (e: any) => {
    console.log(e.target.value);
    // if(isValidName(e.target.value) === true) {
    //   setFirstName(e.target.value)
    //   setFirstNameErrorMessage("")
    // } else {
    //   setFirstNameErrorMessage("Please enter a valid vaccine type.")
    // }
  };

  const [healthCardErrorMessage, setHealthCardErrorMessage] =
    React.useState("");
  const handleHealthCardChanged = (e: any) => {
    console.log(e.target.value);
    // if(isValidName(e.target.value) === true) {
    //   setFirstName(e.target.value)
    //   setFirstNameErrorMessage("")
    // } else {
    //   setFirstNameErrorMessage("Please enter a valid vaccine type.")
    // }
  };

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };


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
                  <Typography variant="h6" align="left">
                    Clinic Public Address
                  </Typography>
                  {/* <TextField
                    required
                    error={vaccineTypeErrorMessage !== ""}
                    helperText={vaccineTypeErrorMessage}
                    id="vaccine-type-field"
                    label="Vaccine Type"
                    type="text"
                    variant="outlined"
                    onChange={handleVaccineTypeChange}
                    sx ={{input: {color: 'white'}}}
                  /> */}
                  <TextField
                    required
                    error={healthCardErrorMessage !== ""}
                    helperText={healthCardErrorMessage}
                    id="clinic-public-field"
                    label="Clinic Public Address"
                    type="text"
                    variant="outlined"
                    onChange={handleHealthCardChanged}
                    style={{
                      backgroundColor: "#424242",
                      border: '1px solid black',
                      borderRadius: '2px'

                  }}
                  InputProps={{
                      style: {
                          color: "white"
                      }
                  }}
                  />

                  <Typography variant="h6" align="left">
                    Clinic Private Address
                  </Typography>
                  <TextField
                    required
                    error={healthCardErrorMessage !== ""}
                    helperText={healthCardErrorMessage}
                    id="clinic-private-field"
                    label="Clinic Private Address"
                    type="text"
                    variant="outlined"
                    onChange={handleHealthCardChanged}
                    style={{
                      backgroundColor: "#424242",
                      border: '1px solid black',
                      borderRadius: '2px'
                  }}
                  InputProps={{
                      style: {
                          color: "white"
                      }
                  }}
                  />
                  <Button variant="contained">Authenticate</Button>

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
                  <Typography variant="h5" align="center">
                    Doses Administered: 69
                  </Typography>
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
                    error={vaccineTypeErrorMessage !== ""}
                    helperText={vaccineTypeErrorMessage}
                    id="first-name-field"
                    label="First Name"
                    type="text"
                    variant="outlined"
                    onChange={handleVaccineTypeChange}
                  />

                  <TextField
                    required
                    error={vaccineTypeErrorMessage !== ""}
                    helperText={vaccineTypeErrorMessage}
                    id="last-name-field"
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    onChange={handleVaccineTypeChange}
                  />
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>

                          <DesktopDatePicker
          label="Date of Birth"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>

                  <TextField
                    required
                    error={vaccineTypeErrorMessage !== ""}
                    helperText={vaccineTypeErrorMessage}
                    id="wallet-address-field"
                    label="Wallet Address"
                    type="text"
                    variant="outlined"
                    onChange={handleVaccineTypeChange}
                    style={{minWidth: '45%'}}
                  />
                  <Button variant="contained" style ={{minHeight: '53px'}}>Verify Patient</Button>
              </Box>


                <Typography variant="h3" align="left">
                  Assign Vaccine
                </Typography>
                <br />
                <Typography variant="h6" align="left">
                  Vaccine Type
                </Typography>
                <Stack alignItems="left" spacing={2}>
                  <TextField
                    disabled
                    error={vaccineTypeErrorMessage !== ""}
                    helperText={vaccineTypeErrorMessage}
                    id="vaccine-type-field"
                    label="Vaccine Type"
                    type="text"
                    variant="filled"
                    onChange={handleVaccineTypeChange}
                  />
                  <Typography variant="h6" align="left">
                    Health Card #
                  </Typography>
                  <TextField
                    disabled
                    error={healthCardErrorMessage !== ""}
                    helperText={healthCardErrorMessage}
                    id="health-card-field"
                    label="Health Card #"
                    type="text"
                    variant="filled"
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