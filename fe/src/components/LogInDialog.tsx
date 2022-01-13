import { useState } from 'react';
import PropTypes from 'prop-types';
import { isValidEmail, isValidPassword } from "../helpers/inputValidationHelpers";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClinicDataService from "../services/ClinicDataService";
import LogInRequest from '../types/LogInRequest';
import UserDataService from "../services/UserDataService";

function LogInDialog(props) {
    const { isUser, onClose, isOpen } = props;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const handleClose = () => {
      onClose();
    };

    const handleSubmit = () => {
      let request: LogInRequest;

      // Making sure all fields are filled
      if(isValidEmail(email) !== true) {
        setEmailErrorMessage("Please enter a valid email")
      } else if(isValidPassword(password) !== true) {
        setPasswordErrorMessage("Please enter a password")
      } else {
        request = { email, password }
  
        if(isUser) {
          UserDataService.login(request)
            .then((response: any) => {
              // navigate('/user-home-page') TODO: Update this when home page is complete
            })
            .catch((e: Error) => {
              console.log(e);
            });
        } else {
          ClinicDataService.login(request)
            .then((response: any) => {
              // navigate('/clinic-home-page') TODO: Update this when home page is complete
            })
            .catch((e: Error) => {
              console.log(e);
            });
        }
          onClose();
      }
    };

    const handleSignUp = () => {
      const route = isUser ? '/user-sign-up' : '/clinic-sign-up'
      navigate(route)
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
  
    return (
      <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={isOpen} >
         <DialogTitle align="center" >Log In</DialogTitle>
         <DialogContent sx={{paddingBottom: 0 }}>
          <Stack spacing={2}>
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
          </Stack>
          <Button variant="text" sx={{textTransform: 'capitalize', paddingLeft: 0.2 }} onClick={handleSignUp}>Don't have an account? </Button>
        </DialogContent>

        <DialogActions sx={{ paddingRight: 3 , paddingBottom: 2 }}>
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