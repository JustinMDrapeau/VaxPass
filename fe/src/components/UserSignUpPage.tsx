import { useState } from 'react';
import PropTypes from 'prop-types';
import { isValidName } from "../helpers/inputValidationHelpers";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import UserInformationFields from './UserInformationFields';

function UserSignUpPage(props: any){
  const { onSubmit, setFirstName, setLastName, setBirthday, birthday, firstName, lastName } = props

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

  const handleOnSubmit = () => {
    if (noMissingInformation() === true) {
      onSubmit()
    }
  }

  const handleBirthdayChange = (e: any) => {
    setBirthday(e)
  }

  const handleClose = () => {
    if (noMissingInformation() === true) {
      props.onClose()
    }
  };

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
        <Button variant="contained" onClick={handleOnSubmit}>SIGNUP</Button>
      </DialogActions>

    </Dialog>
  );
}

UserSignUpPage.propTypes = {
  walletAddress: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Date),
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  setBirthday: PropTypes.func.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  setWalletAddress: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default UserSignUpPage;