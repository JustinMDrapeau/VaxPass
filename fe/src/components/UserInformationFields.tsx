import { Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

function UserInformationFields(props : any) {
    const { handleFirstNameChange, handleLastNameChange, handleBirthdayChange, firstNameErrorMessage, lastNameErrorMessage, birthday } = props;

    return (
        <Stack spacing={2}>
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label="Birthday"
                    inputFormat="MM/dd/yyyy"
                    value={birthday}
                    onChange={handleBirthdayChange}
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture={true}
                />
            </LocalizationProvider>
        </Stack>
    )
}

UserInformationFields.propTypes = {
    handleFirstNameChange: PropTypes.func.isRequired,
    handleLastNameChange: PropTypes.func.isRequired,
    handleBirthdayChange: PropTypes.func.isRequired,
    firstNameErrorMessage: PropTypes.string.isRequired,
    lastNameErrorMessage: PropTypes.string.isRequired,
    birthday: PropTypes.instanceOf(Date).isRequired
  };

export default UserInformationFields;