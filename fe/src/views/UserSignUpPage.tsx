import React from 'react';
import { isValidEmail, isValidHealthNumber, isValidName, isValidPassword } from "../helpers";
import { Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { CountryDropdown } from 'react-country-region-selector';
import { useNavigate } from 'react-router-dom';
import CreateUserRequest from '../types/CreateUserRequest';
import UserDataService from "../services/UserDataService";


function UserSignUp() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [healthCardNumber, setHealthCardNumber] = React.useState("");
  
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState("");
  const [healthCardErrorMessage, setHealthCardErrorMessage] = React.useState("");

  const supportedCountries = ['CA'] // Array of the country shortcodes. 
  // Find short codes here: https://github.com/country-regions/country-region-data/blob/master/data.json

  const navigate = useNavigate();

  const handleFirstNameChange = (e: any) => {
    console.log(e.target.value)
    if(isValidName(e.target.value) === true) {
      setFirstName(e.target.value)
      setFirstNameErrorMessage("")
    } else {
      setFirstNameErrorMessage("Please enter a valid first name")
    }
  }

  const handleLastNameChange = (e: any) => {
    if(isValidName(e.target.value) === true) {
      setLastName(e.target.value)
      setLastNameErrorMessage("")
    } else {
      setLastNameErrorMessage("Please enter a valid last name")
    }
  }

  const handleEmailChange = (e: any) => {
    if(isValidEmail(e.target.value) === true){
      setEmail(e.target.value)
      setEmailErrorMessage("")
    } else {
      setEmailErrorMessage("Please enter a valid email")
    }
  }

  const handlePasswordChange = (e: any) => {
    if(isValidPassword(e.target.value) === true){
      setPassword(e.target.value)
      setPasswordErrorMessage("")
    } else {
      setPasswordErrorMessage("Please enter a password")
    }
  }

  const handleCountryChange = (e: any) => {
    setCountry(e)
  }

  const handleHealthCardNumberChange = (e: any) => {
    if(isValidHealthNumber(e.target.value) === true) {
      setHealthCardNumber(e.target.value)
      setHealthCardErrorMessage("")
    } else {
      setHealthCardErrorMessage("Please enter a health card number")
    }
  }

  const handleLogIn = () => {
    navigate('/login')
  }

  const handleClose = () => {
    navigate('/')
  };

  const noMissingInformation = () => {
    if(firstName === ""){
      setFirstNameErrorMessage("Please enter a first name")
    } else if(lastName === "") {
      setLastNameErrorMessage("Please enter a last name")
    } else if(email === "") {
      setEmailErrorMessage("Please enter an email")
    } else if(password === "") {
      setPasswordErrorMessage("Please enter a password")
    } else if(healthCardNumber === "") {
      setHealthCardErrorMessage("Please enter a health card number")
    } else {
      return true
    }

    return false
  }

  const handleSubmit = () => {
    let request: CreateUserRequest;

    if(noMissingInformation() === true) {
      request = { 
        firstName, 
        lastName, 
        email, 
        password, 
        country, 
        healthCardNumber 
      }

      UserDataService.create(request)
        .then((response) => {
          // navigate('/userHomePage') TODO: Update this when home page is complete
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  return (
    <div className="UserSignUp" style={{backgroundColor: '#D3D3D3', height: '100vh' }} >
      <Container maxWidth='sm' sx={{ pt: '36px'}}>
        <Card style={{ padding: '24px'}}> 
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h2" align="center" >
              VaxPass
            </Typography>
            <Typography variant="h6" align="center" >
              User sign up
            </Typography>
            <Stack spacing={3} width="50%">
              <TextField
                required
                error={firstNameErrorMessage !== ""}
                helperText={firstNameErrorMessage}
                id="first-name-field"
                label="First Name"
                type="text"
                variant="filled"
                onChange={handleFirstNameChange}
              />
              <TextField
                required
                error={lastNameErrorMessage !== ""}
                helperText={lastNameErrorMessage}
                id="last-name-field"
                label="Last Name"
                type="text"
                variant="filled"
                onChange={handleLastNameChange}
              />
              <TextField
                required
                error={emailErrorMessage !== ""}
                helperText={emailErrorMessage}
                id="email-field"
                label="Email"
                type="email"
                variant="filled"
                onChange={handleEmailChange}
              />
              <TextField
                required
                error={passwordErrorMessage !== ""}
                helperText={passwordErrorMessage}
                id="pswd-field"
                label="Password"
                type="password"
                variant="filled"
                onChange={handlePasswordChange}
              />
              <TextField
                required
                error={healthCardErrorMessage !== ""}
                helperText={healthCardErrorMessage}
                id="health-card-number-field"
                label="Health Card Number"
                type="text"
                variant="filled"
                onChange={handleHealthCardNumberChange}
              />
              <CountryDropdown
                value={country}
                whitelist={supportedCountries} // Using whitelist prop since we're only available for Canada
                onChange={handleCountryChange}
              />{""}
            <Button variant="text" sx={{textTransform: 'capitalize' }} onClick={handleLogIn}>Have an account? </Button>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" mt={2} spacing={2}>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button variant="contained" onClick={handleSubmit}>SIGNUP</Button>
          </Stack>
        </Card>
      </Container>
    </div>
  );
}

export default UserSignUp;