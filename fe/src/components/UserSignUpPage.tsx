import { useState } from 'react';
import PropTypes from 'prop-types';
import { isValidName } from "../helpers/inputValidationHelpers";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import UserInformationFields from './UserInformationFields'
import ConfirmUserInformationPopup from './ConfirmUserInformationPopup'
import PatientSignUpInfo from './PatientSignUpInfo'

function UserSignUpPage(props: any){
  const today = new Date()

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
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

  const handleClose = () => {
    props.onClose()
  };

  const handleConfirmationDialogClose = () => {
    setIsInfoOpen(true)
    setIsConfirmationOpen(false)
  }

  const handleInfoDialogClose = () => {
    props.onClose()
    setIsInfoOpen(false)
  }

  const noMissingInformation = () => {
    let noMissingInfo = true;
    if (firstName === "") {
      setFirstNameErrorMessage("Please enter a first name")
      noMissingInfo = false
    }
    if (lastName === "") {
      setLastNameErrorMessage("Please enter a last name")
      noMissingInfo = false
    }

    return noMissingInfo
  }

  const handleSubmit = () => {
    if (noMissingInformation() === true) {
      // Open the information confirmation dialog
      setIsConfirmationOpen(true)
    }
  }

  return (
    <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={props.isOpen} >
      {/* @ts-ignore */}
      <DialogTitle align="center" >User Sign Up</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <Stack alignItems="center" spacing={2}>
          <UserInformationFields
            handleFirstNameChange={handleFirstNameChange}
            handleLastNameChange={handleLastNameChange}
            handleBirthdayChange={handleBirthdayChange}
            firstNameErrorMessage={firstNameErrorMessage}
            lastNameErrorMessage={lastNameErrorMessage}
            birthday={birthday}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ paddingRight: 3, paddingBottom: 2 }}>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button variant="contained" onClick={handleSubmit}>SIGNUP</Button>
      </DialogActions>

      <ConfirmUserInformationPopup
        firstName={firstName}
        lastName={lastName}
        birthday={birthday}
        isOpen={isConfirmationOpen}
        onClose={handleConfirmationDialogClose}
        setBirthday={props.setBirthday}
        setFirstName={props.setFirstName}
        setLastName={props.setLastName}
        setWalletAddress={props.setWalletAddress}
      />

      <PatientSignUpInfo
        firstName={firstName}
        lastName={lastName}
        birthday={birthday}
        walletAddress={props.walletAddress}
        isOpen={isInfoOpen}
        onClose={handleInfoDialogClose}
      />
    </Dialog>
  );
}

UserSignUpPage.propTypes = {
  walletAddress: PropTypes.string.isRequired,
  setBirthday: PropTypes.func.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  setWalletAddress: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default UserSignUpPage;