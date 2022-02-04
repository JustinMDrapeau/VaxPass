import { useState } from 'react';
import { isValidName } from "../helpers/inputValidationHelpers";
import { Button, Card, Container, Stack, Typography } from '@mui/material';
import UserInformationFields from '../components/UserInformationFields'
import ConfirmUserInformationPopup from '../components/ConfirmUserInformationPopup'
import { useNavigate } from 'react-router-dom';


function UserSignUpPage() {
  const today = new Date()

  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(today);

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

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

  const handleBirthdayChange = (e: any) => {
    setBirthday(e)
  }

  const handleClose = () => {
    navigate('/')
  };

  const handleDialogClose = () => {
    setIsOpen(false)
  }

  const noMissingInformation = () => {
    if (firstName === "") {
      setFirstNameErrorMessage("Please enter a first name")
    } else if (lastName === "") {
      setLastNameErrorMessage("Please enter a last name")
    } else {
      return true
    }

    return false
  }

  const handleSubmit = () => {
    if (noMissingInformation() === true) {
      // Open the information confirmation dialog
      setIsOpen(true)
    }
  }

  return (
    <div className="UserSignUp" style={{ backgroundColor: '#D3D3D3', height: '100vh' }} >
      <Container maxWidth='sm' sx={{ pt: '172px' }}>
        <Card style={{ padding: '24px' }}>
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h2" align="center" >
              VaxPass
            </Typography>
            <Typography variant="h6" align="center" >
              User sign up
            </Typography>
            <UserInformationFields
              handleFirstNameChange={handleFirstNameChange}
              handleLastNameChange={handleLastNameChange}
              handleBirthdayChange={handleBirthdayChange}
              firstNameErrorMessage={firstNameErrorMessage}
              lastNameErrorMessage={lastNameErrorMessage}
              birthday={birthday}
            />
          </Stack>
          <Stack direction="row" justifyContent="center" mt={2} spacing={2}>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button variant="contained" onClick={handleSubmit}>SIGNUP</Button>
          </Stack>
        </Card>
      </Container>

      <ConfirmUserInformationPopup
        firstName={firstName}
        lastName={lastName}
        birthday={birthday}
        isOpen={isOpen}
        onClose={handleDialogClose}
      />
    </div>
  );
}

export default UserSignUpPage;