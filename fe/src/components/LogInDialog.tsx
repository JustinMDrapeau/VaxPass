import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isValidName, isValidWalletAddress } from "../helpers/inputValidationHelpers";
import UserInformationFields from '../components/UserInformationFields'

function LogInDialog(props: any) {
  const { isUser, onClose, isOpen } = props;

  const today = new Date()
  const navigate = useNavigate();

  // User properties
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(today);

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

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

  const [walletAddressErrorMessage, setWalletAddressErrorMessage] = useState("")


  const handleWalletAddressChange = (e: any) => {
    if (isValidWalletAddress(e.target.value)) {
      setWalletAddress(e.target.value)
      setWalletAddressErrorMessage("")
    } else {
      setWalletAddressErrorMessage("Please enter a valid wallet address")
    }
  }

  const handleClose = () => {
    onClose();
  };

  const userNoMissingInformation = () => {
    let noMissingInfo = true;

    if (isUser === true) {
      if (firstName === "") {
        setFirstNameErrorMessage("Please enter a first name")
        noMissingInfo = false
      } else if (lastName === "") {
        setLastNameErrorMessage("Please enter a last name")
        noMissingInfo = false
      }
    } 

    if (walletAddress === ""){
      setWalletAddressErrorMessage("Please enter a valid address");
      noMissingInfo = false
    }

    return noMissingInfo

  }


  const handleSubmit = () => {
    if (isUser === true && userNoMissingInformation() === true) {
      // Create Account
    } else if (isUser === false) {
      if (isValidWalletAddress(walletAddress)) {
        // User account page
      } else {
        setWalletAddressErrorMessage("Please enter a valid wallet Address")
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
            id="wallet-address-field"
            label="Wallet Address"
            type="text"
            variant="filled"
            onChange={handleWalletAddressChange}
          />
        </Stack>
        <Button variant="text" sx={{ textTransform: 'capitalize', paddingLeft: 0.2 }} onClick={handleSignUp}>Don't have an account? </Button>
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