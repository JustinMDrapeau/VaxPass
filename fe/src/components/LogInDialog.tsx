import { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isValidName, isValidWalletAddress, isValidPrivateKey } from "../helpers/inputValidationHelpers";
import { computeHash } from "../helpers/hashingHelper"
import UserInformationFields from '../components/UserInformationFields'
import UserDataService from '../services/UserDataService';
import Wallet from 'ethereumjs-wallet'
import Cookies from 'universal-cookie';

function LogInDialog(props: any) {
  const { isUser, onClose, isOpen } = props;

  const today = new Date()
  const cookies = new Cookies();
  const navigate = useNavigate();

  // User properties
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(today);

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [alert, setAlert] = useState(false);

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

  const handleBirthdayChange = (e: any) => {
    setBirthday(e)
  }

  // Clinic properties
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const [walletAddressErrorMessage, setWalletAddressErrorMessage] = useState("")
  const [privateKeyErrorMessage, setprivateKeyErrorMessage] = useState("")

  const handleWalletAddressChange = (e: any) => {
    if (isValidWalletAddress(e.target.value)) {
      setAlert(false);
      setWalletAddress(e.target.value)
      setWalletAddressErrorMessage("")
    } else {
      setWalletAddressErrorMessage("Please enter a valid passport id")
    }
  }

  const handlePrivateKeyChange = (e: any) => {
    if (isValidPrivateKey(e.target.value)) {
      setAlert(false);
      setPrivateKey(e.target.value)
      setprivateKeyErrorMessage("")
    } 
    else {
      setprivateKeyErrorMessage("Please enter a valid 64 character long password that does not begin with 0x")
    }
  }

  const handleClose = () => {
    setAlert(false);
    setFirstName("")
    setLastName("")
    setWalletAddress("")
    setPrivateKey("")
    onClose();
  };

  const userNoMissingInformation = () => {
    let noMissingInfo = true;
    console.log("noMissingInfo pre: " + noMissingInfo + firstName + lastName + walletAddress)
    if (isUser === true) {
      if (firstName === "") {
        setFirstNameErrorMessage("Please enter a valid first name")
        noMissingInfo = false
      }
      if (lastName === "") {
        setLastNameErrorMessage("Please enter a valid last name")
        noMissingInfo = false
      }
    }
    if (walletAddress === "") {
      setWalletAddressErrorMessage("Please enter a valid address");
      noMissingInfo = false
    }
    console.log("noMissingInfo post: " + noMissingInfo)
    return noMissingInfo

  }

  const handleSubmit = () => {
    if (isUser === true && userNoMissingInformation() === true) {
      // Call smart contract method to retrieve patientHash from the walletIdToPatientHash map
      UserDataService.getPatientHash(walletAddress).then((res: any) => {
        console.log(res);
        // Check if calculated hash matches stored hash
        console.log("Checking hash...");
        if (res === computeHash(firstName, lastName, birthday)) {
          console.log("Hashes are equal");

          const patientInfo = {
            firstName,
            lastName,
            birthday,
            walletAddress
          }

          // Direct to patient page
          navigate(`/patient-page/${Buffer.from(JSON.stringify(patientInfo)).toString('base64')}`)
        } else {
          setAlert(true);
          console.log("Hashes are not equal!")
        }
      }).catch((err: any) => console.log(err))
    } else if (isUser === false) {
      if (isValidWalletAddress(walletAddress) && isValidPrivateKey(privateKey)) {
        if (Wallet.fromPrivateKey(Buffer.from(privateKey, 'hex')).getAddress().toString('hex') === walletAddress.toLowerCase().substring(2)) {
          console.log("Logged in")
          // Set cookies
          cookies.set('clinicPublic', walletAddress);
          cookies.set('clinicPrivate', privateKey);
          // Direct to clinic page
          navigate('/clinic-main-page')
        } else {
          setAlert(true);
        }
      } else {
        if (!isValidWalletAddress(walletAddress)){
          setWalletAddressErrorMessage("Please enter a valid passport id")
        }
        if (!isValidPrivateKey(privateKey)){
          setprivateKeyErrorMessage("Please enter a valid 64 character long password that does not begin with 0x")
        }
      }
    }
  };

  const handleSignUp = () => {
    const route = isUser ? '/user-sign-up' : '/clinic-sign-up'
    navigate(route)
  }

  return (
    <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
      {/* @ts-ignore */}
      <DialogTitle align="center" >Log In</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <Collapse in={alert}>
          <Alert severity="warning" sx={{ marginBottom: 2 }}>Your information failed to verify. Please verify your login credentials and try again!</Alert>
        </Collapse>
        <Stack spacing={2}>
          {isUser &&
            <UserInformationFields
              handleFirstNameChange={handleFirstNameChange}
              handleLastNameChange={handleLastNameChange}
              handleBirthdayChange={handleBirthdayChange}
              firstNameErrorMessage={firstNameErrorMessage}
              lastNameErrorMessage={lastNameErrorMessage}
              birthday={birthday}
            />
          }
          <TextField
            required
            error={walletAddressErrorMessage !== ""}
            helperText={walletAddressErrorMessage}
            id="passport-id-field"
            label="Passport id"
            type="text"
            variant="filled"
            onChange={handleWalletAddressChange}
          />
          {!isUser &&
            <>
              <TextField
                required
                error={privateKeyErrorMessage !== ""}
                helperText={privateKeyErrorMessage}
                id="password-field"
                label="Password"
                type="password"
                variant="filled"
                onChange={handlePrivateKeyChange}
              />
              <Button variant="text" sx={{ textTransform: 'capitalize', paddingLeft: 0.2 }} onClick={handleSignUp}>Don't have an account? </Button>
            </>
          }
        </Stack>
      </DialogContent>

      <DialogActions sx={{ paddingRight: 3, paddingBottom: 2 }}>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button variant="contained" onClick={handleSubmit}>LOGIN</Button>
      </DialogActions>
    </Dialog>
  );
}

LogInDialog.propTypes = {
  isUser: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default LogInDialog;