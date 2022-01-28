import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isValidLink } from "../helpers/inputValidationHelpers";
import VerifyFlowWhitelistLinkStep from "../components/VerifyFlowWhitelistLinkStep"
import VerifyFlowSelector from "../components/VerifyFlowSelector"
import VerifyFlowQrScan from "../components/VerifyFlowQrScan"
import VerifyFlowSubmitWalletAddress from "../components/VerifyFlowSubmitWalletAddress"

function VerifyFlow(props: any) {
    const { isOpen, handleClose } = props

    const [whitelistLink, setWhitelistLink] = useState("")
    const [whitelistLinkErrorMessage, setWhitelistLinkErrorMessage] = useState("")
    const [isCameraOpen, setIsCameraOpen] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setbirthday] = useState(new Date())

    const [isQR, setIsQR] = useState(false)

    const [isStepOneOpen, setIsStepOneOpen] = useState(isOpen)
    const [isStepTwoOpen, setIsStepTwoOpen] = useState(false)
    const [isStepThreeOpen, setIsStepThreeOpen] = useState(false)

    useEffect(() => {
        setIsStepOneOpen(isOpen);
    }, [isOpen]);

    const updateIsQR = (value: string) => {
        setIsQR(value === "QR")
    }

    const handleNextStepOne = () => {
        setIsStepTwoOpen(true)
        setIsStepOneOpen(false)
    }

    const handleCloseStepOne = () => {
        setIsStepOneOpen(false)
        handleClose()
    };

    const handleNextStepTwo = () => {
        if (isQR === true) {
            setIsCameraOpen(true)
        } else {
            setIsStepThreeOpen(true)
        }
        setIsStepTwoOpen(false)
    }

    const handleSubmitStepThree = () => {
        setIsStepThreeOpen(false)
        // Navigate to user page
    }

    const handleBackStepTwo = () => {
        setIsStepOneOpen(true)
        setIsStepTwoOpen(false)
    };

    const handleBackStepThree = () => {
        setIsStepTwoOpen(true)
        setIsStepThreeOpen(false)
    };

    const handleBackQr = () => {
        setIsStepTwoOpen(true)
        setIsCameraOpen(false)
    };

    const updateUserInformation = (firstName: string, lastName: string, birthday: Date) => {
        setFirstName(firstName)
        setLastName(lastName)
        setbirthday(birthday)
    }

    const handleScan = (data: any) => {
        if (data) {
            // Data represents the data extracted from the QR code
            setIsCameraOpen(false)
            //navigate to user page
        }
    }

    const updateWhiteListLink = (e) => {
        if (isValidLink(e.target.value) === true || e.target.value === "") {
            setWhitelistLink(e.target.value)
            setWhitelistLinkErrorMessage("")
        } else {
            setWhitelistLinkErrorMessage("Please enter a valid link")
        }
    }

    return (
        <div className="LandingPage" style={{ backgroundColor: '#D3D3D3', height: '100vh' }}>
            <VerifyFlowWhitelistLinkStep
                isOpen={isStepOneOpen}
                updateWhiteListLink={updateWhiteListLink}
                whitelistLinkErrorMessage={whitelistLinkErrorMessage}
                handleNext={handleNextStepOne}
                handleClose={handleCloseStepOne}
            />
            <VerifyFlowSelector
                isOpen={isStepTwoOpen}
                updateStep={handleNextStepTwo}
                handleClose={handleBackStepTwo}
                updateIsQR={updateIsQR}
            />
            <VerifyFlowQrScan
                isOpen={isCameraOpen}
                handleScan={handleScan}
                handleClose={handleBackQr}
            />
            <VerifyFlowSubmitWalletAddress
                isOpen={isStepThreeOpen}
                updateUserInformation={updateUserInformation}
                handleClose={handleBackStepThree}
            />
        </div>
    )
}

VerifyFlow.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default VerifyFlow;