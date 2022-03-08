import { useState } from 'react';
import { isValidAddress, isValidEmail, isValidName, isValidPostalCode, isValidClinicName } from "../helpers/inputValidationHelpers";
import { Alert, Box, Button, Card, Checkbox, Container, FormGroup, FormControlLabel, Stack, TextField, Tooltip, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { CountryDropdown } from 'react-country-region-selector';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

import ClinicDataService from '../services/ClinicDataService';
import ClinicAccountCreationPopup from '../components/ClinicAccountCreationPopup';

function ClinicSignUpPage() {
  const [clinicName, setClinicName] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setpostCode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [privateAddress, setPrivateAddress] = useState("");
  const [walletExists, setWalletExists] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [clinicNameErrorMessage, setClinicNameErrorMessage] = useState("");
  const [addressErrorMessage, setAddressErrorMessage] = useState("");
  const [postCodeErrorMessage, setpostCodeErrorMessage] = useState("");
  const [cityErrorMessage, setCityErrorMessage] = useState("");
  const [countryErrorMessage, setCountryErrorMessage] = useState("");
  const [publicAddressErrorMessage, setPublicAddressErrorMessage] = useState("");
  const [privateAddressErrorMessage, setPrivateAddressErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [creationErrorMessage, setCreationErrorMessage] = useState("");

  const supportedCountries = ['CA'] // Array of the country shortcodes. 
  // Find short codes here: https://github.com/country-regions/country-region-data/blob/master/data.json

  const navigate = useNavigate();

  const handleClinicNameChange = (e: any) => {
    if (isValidClinicName(e.target.value) === true) {
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

  const handlepostCodeChange = (e: any) => {
    // Only checking for postal code since only allowing Canada for now
    if (isValidPostalCode(e.target.value) === true) {
      setpostCode(e.target.value)
      setpostCodeErrorMessage("")
    } else {
      setpostCodeErrorMessage("Please enter a valid post code")
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
    setCountryErrorMessage("");
    setCountry(e)
  }

  const handlePublicAddressChange = (e: any) => {
    setPublicAddress(e.target.value)
  }

  const handlePrivateAddressChange = (e: any) => {
    setPrivateAddress(e.target.value)
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
    } else if (postCode === "") {
      setpostCodeErrorMessage("Please enter a postcode")
    } else if (city === "") {
      setCityErrorMessage("Please enter a city")
    } else if (walletExists && publicAddress === "") {
      setPublicAddressErrorMessage("Please enter the wallet's public address")
    } else if (walletExists && privateAddress === "") {
      setPrivateAddressErrorMessage("Please enter the wallet's private address")
    } else if (country === "") {
      setCountryErrorMessage("Please select a country")
    } else {
      return true
    }

    return false
  }

  const concatAddress = () => {
    return address.trim()+", "+city.trim()+" "+postCode
  }

  const handleSubmit = async() => {
    setLoading(true);

    if (!noMissingInformation()) {
      setLoading(false);
      return;
    }
    const finalAddress = concatAddress()

    const res = await ClinicDataService.createAccount(clinicName, finalAddress, email, publicAddress, privateAddress)

    if (res.length === 1) {
      setCreationErrorMessage(res[0]);
      setLoading(false);
      return;
    }

    setLoading(false);
    setPublicAddress(res[0]);
    setPrivateAddress(res[1].substring(2));
    setAccountCreated(true);
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
                  error={postCodeErrorMessage !== ""}
                  helperText={postCodeErrorMessage}
                  id="post-code-field"
                  label="Post Code"
                  type="text"
                  variant="filled"
                  onChange={handlepostCodeChange}
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
              />
              {countryErrorMessage && (
                <Alert sx={{marginTop: 2}} severity="error">{countryErrorMessage}</Alert>
              )}
              <Box display="flex">
                <FormGroup>
                  <FormControlLabel 
                    control={<Checkbox value={walletExists} onClick={() => {setWalletExists(!walletExists)}} />} 
                    label="My Clinic Already Has A Wallet"
                  />
                </FormGroup>
                <Box display="flex" alignItems="center">
                  <Tooltip title="If you do not have a wallet, VaxPass will create a wallet for you, which you or a government organization can then fund.">
                    <InfoIcon />
                  </Tooltip> 
                </Box> 
              </Box>
              {walletExists &&
                <Stack justifyContent="center" mt={2} spacing={2}>
                  <TextField
                    required
                    error={publicAddressErrorMessage !== ""}
                    helperText={publicAddressErrorMessage}
                    id="clinic-public-address"
                    label="Wallet Public Address"
                    type="text"
                    variant="filled"
                    onChange={handlePublicAddressChange}
                  />
                  <TextField
                    required
                    error={privateAddressErrorMessage !== ""}
                    helperText={privateAddressErrorMessage}
                    id="clinic-private-address"
                    label="Wallet Private Address"
                    type="text"
                    variant="filled"
                    onChange={handlePrivateAddressChange}
                  />
                </Stack>
              }
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" mt={2} spacing={2}>
            <Button onClick={handleClose}>CANCEL</Button>
            <LoadingButton loading={loading} variant="contained" onClick={handleSubmit}>
              SIGNUP
            </LoadingButton>
          </Stack>
          {creationErrorMessage && (
            <Alert sx={{marginTop: 2}} severity="error">{creationErrorMessage}</Alert>
          )}
        </Card>
      </Container>
      <ClinicAccountCreationPopup 
        clinicName={clinicName}
        address={concatAddress()}
        email={email}
        publicAddress={publicAddress}
        privateAddress={privateAddress}
        isOpen={accountCreated}
      />
    </div>
  );
}

export default ClinicSignUpPage;