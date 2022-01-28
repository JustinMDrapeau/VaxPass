import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isValidLink } from "../helpers/inputValidationHelpers";
import { useNavigate } from 'react-router-dom';
import VerifyFlowWhitelistLinkStep from "../components/VerifyFlowWhitelistLinkStep"
import VerifyFlowSelector from "../components/VerifyFlowSelector"
import VerifyFlowQrScan from "../components/VerifyFlowQrScan"
import VerifyFlowSubmitWalletAddress from "../components/VerifyFlowSubmitWalletAddress"

function VerifyFlow(props: any) {
    const { isOpen, handleClose } = props

    const [whitelistLink, setWhitelistLink] = useState("")
    const [whitelistLinkErrorMessage, setWhitelistLinkErrorMessage] = useState("")
    const [isCameraOpen, setIsCameraOpen] = useState(false)

    const [isQR, setIsQR] = useState(false)

    const [isStepOneOpen, setIsStepOneOpen] = useState(isOpen)
    const [isStepTwoOpen, setIsStepTwoOpen] = useState(false)
    const [isStepThreeOpen, setIsStepThreeOpen] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        setIsStepOneOpen(isOpen);
    }, [isOpen]);

    const updateIsQR = (value: string) => {
        setIsQR(value === "Qr")
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

    const handleScan = (data: any) => {
        if (data) {
            console.log(data)
            setIsCameraOpen(false)
            //navigate to user page
        }
    }

    const updateWhiteListLink = (e: any) => {
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
                handleNext={handleNextStepTwo}
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
                handleNext={handleSubmitStepThree}
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