import PropTypes from 'prop-types';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import WhitelistLinkData from '../types/WhitelistLinkData';

function WhiteListTextField(props: any) {
    const { whitelistLinkDetails, handleAdd, handleRemove, updateWhiteListLinksDetails } = props;

    const renderButton = (index: any, value: any) => {
        return index === 0 ?
            (<InputAdornment position="end">
                <IconButton edge="end" color="default" onClick={handleAdd}>
                    <AddCircleOutlineIcon fontSize="small" />
                </IconButton>
            </InputAdornment>)
            : (<InputAdornment position="end">
                <IconButton edge="end" color="default" onClick={() => handleRemove(index)}>
                    <RemoveCircleOutlineIcon fontSize="small" />
                </IconButton>
            </InputAdornment>)
    }

    return whitelistLinkDetails.map((element: WhitelistLinkData, index: number) => {
        return <TextField
            error={element.errorMessage !== ""}
            helperText={element.errorMessage}
            id={"whitelist-link-field-" + index}
            name="link"
            defaultValue={element.link}
            label="Whitelist Link"
            type="whitelist"
            variant="filled"
            onChange={(e) => updateWhiteListLinksDetails(e, index)}
            InputProps={{
                endAdornment: renderButton(index, element.link)
            }}
        />
    })
}

WhiteListTextField.propTypes = {
    whitelistLinkDetails: PropTypes.array.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    updateWhiteListLinksDetails: PropTypes.func.isRequired
}

export default WhiteListTextField;