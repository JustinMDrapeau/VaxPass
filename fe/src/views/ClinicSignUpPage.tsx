import { useState } from 'react';
import { isValidAddress, isValidEmail, isValidName, isValidPostalCode } from "../helpers/inputValidationHelpers";
import { Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { CountryDropdown } from 'react-country-region-selector';
import { useNavigate } from 'react-router-dom';

import ClinicDataService from '../services/ClinicDataService';

function ClinicSignUpPage() {
  const [clinicName, setClinicName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [clinicNameErrorMessage, setClinicNameErrorMessage] = useState("");
  const [addressErrorMessage, setAddressErrorMessage] = useState("");
  const [zipCodeErrorMessage, setZipCodeErrorMessage] = useState("");
  const [cityErrorMessage, setCityErrorMessage] = useState("");

  const supportedCountries = ['CA'] // Array of the country shortcodes. 
  // Find short codes here: https://github.com/country-regions/country-region-data/blob/master/data.json

  const navigate = useNavigate();

  const handleClinicNameChange = (e: any) => {
    if (isValidName(e.target.value) === true) {
      setClinicName(e.target.value)
      setClinicNameErrorMessage("")
    } else {
      setClinicNameErrorMessage("Please enter a valid clinic name")
    }
  }

  const handleAddressChange = (e: any) => {
    if (isValidAddress(e.target.value) === true) {
      setAddress(e.target.value)
      setAddressErrorMessage("")
    } else {
      setAddressErrorMessage("Please enter a valid address")
    }
  }

  const handleZipCodeChange = (e: any) => {
    // Only checking for postal code since only allowing Canada for now
    if (isValidPostalCode(e.target.value) === true) {
      setZipCode(e.target.value)
      setZipCodeErrorMessage("")
    } else {
      setZipCodeErrorMessage("Please enter a valid zip code")
    }
  }

  const handleCityChange = (e: any) => {
    if (isValidName(e.target.value) === true) {
      setCity(e.target.value)
      setCityErrorMessage("")
    } else {
      setCityErrorMessage("Please enter a valid city name")
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

  const handleCountryChange = (e: any) => {
    setCountry(e)
  }

  const handleClose = () => {
    navigate('/')
  };

  const noMissingInformation = () => {
    if (clinicName === "") {
      setClinicNameErrorMessage("Please enter a clinic name")
    } else if (email === "") {
      setEmailErrorMessage("Please enter an email")
    } else if (address === "") {
      setAddressErrorMessage("Please enter an address")
    } else if (zipCode === "") {
      setZipCodeErrorMessage("Please enter a zip code")
    } else if (city === "") {
      setCityErrorMessage("Please enter a city")
    } else {
      return true
    }

    return false
  }

  const concatAddress = () => {
    return address.trim()+", "+city.trim()+" "+zipCode
  }

  const handleSubmit = () => {

    if (noMissingInformation() === true) {
      const finalAddress = concatAddress()
      // create wallet
      // navigate to clinic page
    }
  }

  const handleMail = () => {

    // ClinicDataService.getClinicInfo("0x4CBA51c5FA1847B208eD0D753eeA2000D82943Bc")
    //   .then((res :any ) => {
    //     console.log(res)
    //   })
    //   .catch((err : any) => {
    //     console.log(err)
    //   })

    const SUBJECT = "VaxPass Clinic Approval Request"
    const CLINIC_NAME = "Clinic Name"
    const CLINIC_EMAIL = "clinic@email.com"
    const CLINIC_ADDRESS = "123 Test Street"
    const BODY = `To whom it may concern,\n\nOur clinic ${CLINIC_NAME} would like to be added to your govenment's vaccination approval list. Here is our clinic's information: \n\nClinic Name: ${CLINIC_NAME}\nClinic Location/Address: ${CLINIC_ADDRESS}\nClinic Email: ${CLINIC_EMAIL}\nPublic Wallet Address: 0x123...\n\nThanks,\n${CLINIC_NAME}`

    const mailString = `mailto:?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`
    
    window.open(mailString, '_blank');
  }

return (
    <div className="ClinicSignUp" style={{ backgroundColor: '#D3D3D3', height: '100vh' }} >
      <Container maxWidth='sm' sx={{ pt: '110px' }}>
        <Card style={{ padding: '24px' }}>
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h2" align="center" >
              VaxPass
            </Typography>
            <Typography variant="h6" align="center" >
              Clinic sign up
            </Typography>
            <Stack spacing={3} width="50%">
              <TextField
                required
                error={clinicNameErrorMessage !== ""}
                helperText={clinicNameErrorMessage}
                id="clinic-name-field"
                label="Clinic Name"
                type="text"
                variant="filled"
                onChange={handleClinicNameChange}
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
                error={addressErrorMessage !== ""}
                helperText={addressErrorMessage}
                id="address-field"
                label="Address"
                type="text"
                variant="filled"
                onChange={handleAddressChange}
              />
              <Stack direction="row" justifyContent="center" mt={2} spacing={2}>
                <TextField
                  required
                  error={zipCodeErrorMessage !== ""}
                  helperText={zipCodeErrorMessage}
                  id="zip-code-field"
                  label="Zip Code"
                  type="text"
                  variant="filled"
                  onChange={handleZipCodeChange}
                />
                <TextField
                  required
                  error={cityErrorMessage !== ""}
                  helperText={cityErrorMessage}
                  id="city-field"
                  label="City"
                  type="text"
                  variant="filled"
                  onChange={handleCityChange}
                />
              </Stack>
              <CountryDropdown
                value={country}
                whitelist={supportedCountries} // Using whitelist prop since we're only available for Canada
                onChange={handleCountryChange}
              />{""}
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" mt={2} spacing={2}>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button variant="contained" onClick={handleSubmit}>SIGNUP</Button>
            <Button variant="contained" onClick={handleMail}>
              TEMP BUTTON
            </Button>
          </Stack>
        </Card>
      </Container>
    </div>
  );
}

export default ClinicSignUpPage;