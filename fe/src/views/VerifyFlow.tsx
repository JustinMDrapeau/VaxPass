import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isValidLink, isValidName, isValidWalletAddress } from "../helpers/inputValidationHelpers";
import VerifyFlowWhitelistLinkStep from "../components/VerifyFlowWhitelistLinkStep"
import VerifyFlowSelector from "../components/VerifyFlowSelector"
import VerifyFlowQrScan from "../components/VerifyFlowQrScan"
import VerifyFlowSubmitWalletAddress from "../components/VerifyFlowSubmitWalletAddress"
import WhitelistLinkData from '../types/WhitelistLinkData';
import { useNavigate } from 'react-router-dom';

function VerifyFlow(props: any) {
    const navigate = useNavigate();

    const { isOpen, handleClose } = props

    const [whitelistLinks, setWhitelistLinks] = useState<Array<WhitelistLinkData>>([{ link: "", errorMessage: "" }])
    const [isCameraOpen, setIsCameraOpen] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState(new Date())
    const [walletAddress, setWalletAddress] = useState("")

    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
    const [walletAddressErrorMessage, setWalletAddressErrorMessage] = useState("")

    const [isQR, setIsQR] = useState(false)

    const [isStepOneOpen, setIsStepOneOpen] = useState(isOpen)
    const [isStepTwoOpen, setIsStepTwoOpen] = useState(false)
    const [isStepThreeOpen, setIsStepThreeOpen] = useState(false)

    useEffect(() => {
        setIsStepOneOpen(isOpen);
    }, [isOpen]);

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

    const handleWalletAddressChange = (e: any) => {
        if (isValidWalletAddress(e.target.value) === true) {
            setWalletAddress(e.target.value)
            setWalletAddressErrorMessage("")
        } else {
            setWalletAddressErrorMessage("Please enter a valid wallet address")
        }
    }

    const updateIsQR = (value: string) => {
        setIsQR(value === "QR")
    }

    const handleNextStepOne = () => {
        let newWhitelistLinksArr: Array<WhitelistLinkData> = [...whitelistLinks]
        if ((newWhitelistLinksArr.filter((element) => element.errorMessage !== "")).length === 0) {
            // All fields have no errors

            let noDupesWhitelistLinks = Array.from(new Set(newWhitelistLinksArr.map(a => a.link)))
                .map(link => {
                    return newWhitelistLinksArr.find(a => a.link === link)
                })
                
            if (noDupesWhitelistLinks !== undefined){
                if(noDupesWhitelistLinks.length > 1) {
                    /* @ts-ignore */
                    noDupesWhitelistLinks = noDupesWhitelistLinks.filter(element => element.link !== "")
                }
                /* @ts-ignore */
                setWhitelistLinks(noDupesWhitelistLinks)
            }

            setIsStepTwoOpen(true)
            setIsStepOneOpen(false)
        }
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
        handleClose()

        const patientInfo = {
            firstName,
            lastName,
            birthday,
            walletAddress
        }
        navigate( `/patient-page/${Buffer.from(JSON.stringify(patientInfo)).toString('base64')}`)
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

    const userNoMissingInformation = () => {
        let noMissingInfo = true;
        if (firstName === "") {
            setFirstNameErrorMessage("Please enter a first name")
            noMissingInfo = false
        } else if (lastName === "") {
            setLastNameErrorMessage("Please enter a last name")
            noMissingInfo = false
        } else if (walletAddress === "") {
            setWalletAddressErrorMessage("Please enter a valid address")
            noMissingInfo = false
        }

        return noMissingInfo

    }

    const handleUserInfoSubmit = () => {
        if (userNoMissingInformation() === true) {
            handleSubmitStepThree()
        }
    }

    const handleScan = (data: any) => {
        if (data) {
            // Data represents the data extracted from the QR code
            const url = JSON.parse(data).replace(window.location.origin,"")

            setIsCameraOpen(false)
            handleClose()

            navigate(url)
        }
    }

    const updateWhiteListLink = (e: any, index: any) => {
        let newWhiteListLinks: Array<WhitelistLinkData> = [...whitelistLinks];
        if (isValidLink(e.target.value) === true || e.target.value === "") {
            newWhiteListLinks[index].link = e.target.value;
            newWhiteListLinks[index].errorMessage = "";
            setWhitelistLinks(newWhiteListLinks);
        } else {
            newWhiteListLinks[index].errorMessage = "Please ensure the link is valid";
            setWhitelistLinks(newWhiteListLinks);
        }
    }

    const handleAddWhitelistField = () => {
        setWhitelistLinks([...whitelistLinks, { link: "", errorMessage: "" }])
    }

    const handleRemoveField = (index: any) => {
        let newWhiteListLinks: Array<WhitelistLinkData> = [...whitelistLinks];
        newWhiteListLinks.splice(index, 1);
        setWhitelistLinks(newWhiteListLinks)
    }

    return (
        <div className="VerifyFlow">
            <VerifyFlowWhitelistLinkStep
                isOpen={isStepOneOpen}
                whiteListLinks={whitelistLinks}
                updateWhiteListLink={updateWhiteListLink}
                handleNext={handleNextStepOne}
                handleClose={handleCloseStepOne}
                handleAddField={handleAddWhitelistField}
                handleRemoveField={handleRemoveField}
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
                handleWalletAddressChange={handleWalletAddressChange}
                handleClose={handleBackStepThree}
                handleFirstNameChange={handleFirstNameChange}
                handleLastNameChange={handleLastNameChange}
                handleBirthdayChange={handleBirthdayChange}
                handleSubmit={handleUserInfoSubmit}
                firstNameErrorMessage={firstNameErrorMessage}
                lastNameErrorMessage={lastNameErrorMessage}
                walletAddressErrorMessage={walletAddressErrorMessage}
                birthday={birthday}
            />
        </div>
    )
}

VerifyFlow.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default VerifyFlow;