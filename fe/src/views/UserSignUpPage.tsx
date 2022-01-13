import { useState } from 'react';
import { isValidEmail, isValidHealthNumber, isValidName, isValidPassword } from "../helpers/inputValidationHelpers";
import { Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { CountryDropdown } from 'react-country-region-selector';
import { useNavigate } from 'react-router-dom';
import CreateUserRequest from '../types/CreateUserRequest';
import UserDataService from "../services/UserDataService";


function UserSignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [healthCardNumber, setHealthCardNumber] = useState("");

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [healthCardErrorMessage, setHealthCardErrorMessage] = useState("");
  const [createErrorMessage, setCreateErrorMessage] = useState("");

  const supportedCountries = ['CA'] // Array of the country shortcodes. 
  // Find short codes here: https://github.com/country-regions/country-region-data/blob/master/data.json

  const navigate = useNavigate();

  const handleFirstNameChange = (e: any) => {
    if (isValidName(e.target.value) === true) {
      setFirstName(e.target.value)
      setFirstNameErrorMessage("")
    } else {
      setFirstNameErrorMessage("Please enter a valid first name")
    }
  }

  const handleLastNameChange = (e: any) => {
    if (isValidName(e.target.value) === true) {
      setLastName(e.target.value)
      setLastNameErrorMessage("")
    } else {
      setLastNameErrorMessage("Please enter a valid last name")
    }
  }

  const handleEmailChange = (e: any) => {
    if (isValidEmail(e.target.value) === true) {
      setEmail(e.target.value)
      setEmailErrorMessage("")
    } else {
      setEmailErrorMessage("Please enter a valid email")
    }
  }

  const handlePasswordChange = (e: any) => {
    if (isValidPassword(e.target.value) === true) {
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
    if (isValidHealthNumber(e.target.value) === true) {
      setHealthCardNumber(e.target.value)
      setHealthCardErrorMessage("")
    } else {
      setHealthCardErrorMessage("Please enter a health card number")
    }
  }

  const handleClose = () => {
    navigate('/')
  };

  const noMissingInformation = () => {
    if (firstName === "") {
      setFirstNameErrorMessage("Please enter a first name")
    } else if (lastName === "") {
      setLastNameErrorMessage("Please enter a last name")
    } else if (email === "") {
      setEmailErrorMessage("Please enter an email")
    } else if (password === "") {
      setPasswordErrorMessage("Please enter a password")
    } else if (healthCardNumber === "") {
      setHealthCardErrorMessage("Please enter a health card number")
    } else {
      return true
    }

    return false
  }

  const handleSubmit = () => {
    let request: CreateUserRequest;

    if (noMissingInformation() === true) {
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
          setCreateErrorMessage("")
          const { id } = response.data;
          // navigate('/userHomePage') TODO: Update this when home page is complete
        })
        .catch((error: Error) => {
          if (error.response) {
            // Request made and server responded
            const errorKey = Object.keys(error.response.data)[0];
            setCreateErrorMessage(error.response.data[errorKey])
          } else {
            // Something happened in setting up the request that triggered an Error
            setCreateErrorMessage("There is an issue on our side. Try again later!")
          }
        });
    }
  }

  return (
    <div className="UserSignUp" style={{ backgroundColor: '#D3D3D3', height: '100vh' }} >
      <Container maxWidth='sm' sx={{ pt: '54px' }}>
        <Card style={{ padding: '24px' }}>
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
            </Stack>
          </Stack>
          {createErrorMessage && 
            <Typography sx={{ color: 'red', margin: '10px' }} align="center" >
              {createErrorMessage}
            </Typography> 
          }
          <Stack direction="row" justifyContent="center" mt={2} spacing={2}>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button variant="contained" onClick={handleSubmit}>SIGNUP</Button>
          </Stack>
        </Card>
      </Container>
    </div>
  );
}

export default UserSignUpPage;