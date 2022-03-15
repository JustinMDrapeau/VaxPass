import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Alert, AppBar, Box, Button, Card, Collapse, Container, Grid, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { computeHash } from "../helpers/hashingHelper"
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ClinicDataService from "../services/ClinicDataService";
import UserDataService from "../services/UserDataService";
import Cookies from 'universal-cookie';
import UserSignUpPage from "../components/UserSignUpPage";
import ConfirmUserInformationPopup from '../components/ConfirmUserInformationPopup'
import PatientSignUpInfo from '../components/PatientSignUpInfo'

export default function ClinicMainPage(props: any) {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [birthday, setBirthday] = React.useState<Date | null>(new Date());
  const [dateAdministered, setDateAdministered] = React.useState<Date | null>(new Date());

  const [signUpPatientOpen, setSignUpPatientOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [clinicName, setClinicName] = useState("");
  const [clinicPhysicalAddress, setClinicPhysicalAddress] = useState("");
  const [clinicEmail, setClinicEmail] = useState("");

  const clinicPublic = cookies.get("clinicPublic");
  const clinicPrivate = cookies.get("clinicPrivate");

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [lotNumber, setLotNumber] = useState<string>("");
  const [phaseNumber, setPhaseNumber] = useState<number | null>(null);

  const [patientDisabled, setPatientDisabled] = useState<boolean | undefined>(true);
  const [vaccineDisabled, setVaccineDisabled] = useState<boolean | undefined>(true);

  const [loading, setLoading] = useState(false);

  const [lowFundsErrorMessage, setLowFundsErrorMessage] = useState("");
  const [verificationErrorMessage, setVerificationErrorMessage] = useState(false);

  useEffect(() => {
    ClinicDataService.getClinicInfo(clinicPublic)
      .then((res: any) => {
        setClinicName(res.name);
        setClinicEmail(res.email);
        setClinicPhysicalAddress(res.p_address);
      })
      .catch((err: any) => console.log(err));

    async function verifyClinicBalance() {
      const res = await ClinicDataService.getClinicBalance(clinicPublic);
      setLowFundsErrorMessage(res);
      res === "" ? setPatientDisabled(false) : setPatientDisabled(true);
    }

    verifyClinicBalance();
  }, [clinicPublic]);

  const verifyPatient = () => {
    UserDataService.getPatientHash(walletAddress)
      .then((res: any) => {
        console.log(res);
        // create logic for local hash
        console.log("CHECKING HASH...");
        if (res === computeHash(firstName, lastName, birthday)) {
          // if (res == computeHash()) {
          console.log("HASHES ARE EQUAL");
          setVerificationErrorMessage(false);
          setVaccineDisabled(false);
        } else {
          console.log("HASHES ARE NOT EQUAL!");
          setVerificationErrorMessage(true);
          setVaccineDisabled(true);
        }
      })
      .catch((err: any) => console.log(err));
  }

  const signOut = () => {
    console.log("Signed out")
    // Remove cookies
    cookies.remove('clinicPublic');
    cookies.remove('clinicPrivate');
    // Direct to landing page
    navigate('/');
  }

  const handleClose = () => {
      setSignUpPatientOpen(false);
  }

  const handleConfirmationDialogClose = () => {
    setSignUpPatientOpen(true);
    setIsConfirmationOpen(false)
  }

  const handleInfoDialogClose = () => {
    setIsInfoOpen(false)
  }

  const handleSignUpSubmit = () => {
      // Open the information confirmation dialog
      setSignUpPatientOpen(false);
      setIsConfirmationOpen(true)
  }

  const handleConfirmationDialog = () => {
    setIsConfirmationOpen(false)
    setIsInfoOpen(true)
  }

  const handleAssign = () => {
    setLoading(true);
    const vaccineAdministeredDate = dateAdministered?.toDateString();
    ClinicDataService.mintAndTransfer(
      clinicPublic,
      clinicPrivate,
      product,
      lotNumber,
      phaseNumber as number,
      vaccineAdministeredDate as string,
      walletAddress
    ).then((res) => {
      console.log(res);
      console.log("Vaccine administered");

      setFirstName("")
      setLastName("")
      setBirthday(new Date())
      setWalletAddress("")
      setProduct("")
      setLotNumber("")
      setPhaseNumber(null)
      setDateAdministered(new Date())
      setVaccineDisabled(true)
      setLoading(false);
    });
  }

  const handleMail = () => {
    const subject = "VaxPass Clinic Approval Request"
    const body = `To whom it may concern,\n\nOur clinic ${clinicName} would like to be added to your govenment's vaccination approval list. Here is our clinic's information: \n\nClinic Name: ${clinicName}\nClinic Location/Address: ${clinicPhysicalAddress}\nClinic Email: ${clinicEmail}\nPassport Id: ${clinicPublic}\n\nThanks,\n${clinicName}`
    const mailString = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailString, '_blank');
  }

  return (
    <div
      className="ClinicMainPage"
      style={{ backgroundColor: "#D3D3D3", height: "100vh" }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            <MedicalServicesIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Clinic Page
            </Typography>
            <Button
              color="inherit"
              onClick={signOut}
            >
              Signout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box style={{ height: "83%" }}>
        <Grid container spacing={2} style={{ height: "100%" }}>
          <Grid item xs={4} style={{ height: "100%" }}>
            <Container sx={{ pt: "36px" }} style={{ height: "100%" }}>
              <Card
                style={{
                  backgroundColor: "#242424",
                  color: "white",
                  padding: "24px",
                  paddingTop: "5vh",
                  paddingBottom: "10vh",
                  borderRadius: "8px",
                }}
              >
                {lowFundsErrorMessage && (
                  <Alert sx={{marginTop: 2}} severity="error">{lowFundsErrorMessage}</Alert>
                )}
                <Stack alignItems="left" spacing={2}>
                  <br />
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ wordBreak: "break-word" }}
                  >
                    {clinicName}
                  </Typography>
                  <Typography
                    variant="h5"
                    align="center"
                    style={{ wordBreak: "break-word" }}
                  >
                    {clinicPhysicalAddress}
                  </Typography>
                  <Typography
                    variant="h5"
                    align="center"
                    style={{ wordBreak: "break-word" }}
                  >
                    {clinicEmail}
                  </Typography>
                  <br />
                  <br />
                  <Typography
                    variant="h5"
                    align="center"
                    style={{ wordBreak: "break-word" }}
                  >
                    Passport Id:
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    style={{ wordBreak: "break-word" }}
                  >
                    {clinicPublic}
                  </Typography>
                  <br />
                  <Button variant="contained" onClick={handleMail}>REQUEST GOVERNMENT APPROVAL</Button>
                </Stack>
              </Card>
            </Container>
          </Grid>
          <Grid item xs={8}>
            <Container sx={{ pt: "36px" }}>
              <Card
                style={{
                  padding: "48px",
                  paddingTop: "5vh",
                  paddingBottom: "5vh",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h3" align="left">
                  Verify Patient
                </Typography>
                <br />
                <Collapse in={verificationErrorMessage}>
                  <Alert severity="warning" sx={{ marginBottom: 2 }}>Patient information failed to verify. Please verify their credentials and try again!</Alert>
                </Collapse>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                >
                  <TextField
                    required
                    id="first-name-field"
                    value={firstName}
                    label="First Name"
                    type="text"
                    variant="outlined"
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={patientDisabled}
                  />

                  <TextField
                    required
                    id="last-name-field"
                    value={lastName}
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={patientDisabled}
                  />

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date of Birth"
                      inputFormat="MM/dd/yyyy"
                      value={birthday}
                      onChange={setBirthday}
                      renderInput={(params) => <TextField {...params} />}
                      disableFuture={true}
                      disabled={patientDisabled}
                    />
                  </LocalizationProvider>

                  <TextField
                    required
                    id="wallet-address-field"
                    label="Passport Id"
                    value={walletAddress}
                    type="text"
                    variant="outlined"
                    onChange={(e) => setWalletAddress(e.target.value)}
                    style={{ minWidth: "45%" }}
                    disabled={patientDisabled}
                  />
                  <Button
                    variant="contained"
                    style={{ minHeight: "53px" }}
                    onClick={verifyPatient}
                    disabled={
                      !firstName ||
                      !lastName ||
                      !birthday ||
                      !walletAddress
                    }
                  >
                    Verify Patient
                  </Button>
                  <Button
                    variant="contained"
                    style={{ minHeight: "53px" }}
                    onClick={()=>setSignUpPatientOpen(true)}
                    disabled={patientDisabled}
                  >
                    Signup Patient
                  </Button>
                  <UserSignUpPage
                    walletAddress={walletAddress}
                    birthday={birthday}
                    firstName={firstName}
                    lastName={lastName}
                    setBirthday={setBirthday}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setWalletAddress={setWalletAddress}
                    onClose={handleClose}
                    isOpen={signUpPatientOpen}
                    onSubmit={handleSignUpSubmit}
                  />
                </Box>

                <br />
                <br />

                <Typography variant="h3" align="left">
                  Assign Vaccine
                </Typography>
                <br />
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                >
                  <TextField
                    required
                    id="vaccine-product-field"
                    label="Product"
                    type="text"
                    variant="outlined"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    style={{ minWidth: "40%" }}
                    disabled={vaccineDisabled}
                  />

                  <TextField
                    required
                    id="vaccine-lot-number"
                    label="Lot #"
                    type="text"
                    variant="outlined"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                    style={{ maxWidth: "20%" }}
                    disabled={vaccineDisabled}
                  />

                  <TextField
                    required
                    id="vaccine-phase-number"
                    label="Phase #"
                    type="number"
                    variant="outlined"
                    value={phaseNumber}
                    onChange={(e) => setPhaseNumber(parseInt(e.target.value))}
                    style={{ maxWidth: "20%" }}
                    disabled={vaccineDisabled}
                  />

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date Issued"
                      inputFormat="MM/dd/yyyy"
                      onChange={setDateAdministered}
                      value={dateAdministered}
                      renderInput={(params) => <TextField {...params} />}
                      disabled={vaccineDisabled}
                      disableFuture={true}
                    />
                  </LocalizationProvider>
                  <LoadingButton
                    loading={loading}
                    variant="contained"
                    style={{ minHeight: "53px" }}
                    disabled={
                      !clinicPublic ||
                      !clinicPrivate ||
                      !product ||
                      !lotNumber ||
                      phaseNumber === null ||
                      !dateAdministered ||
                      !walletAddress
                    }
                    onClick={handleAssign}
                  >
                    Assign
                  </LoadingButton>
                </Box>
              </Card>
            </Container>
          </Grid>
        </Grid>
      </Box>

      <ConfirmUserInformationPopup
        firstName={firstName}
        lastName={lastName}
        birthday={birthday}
        isOpen={isConfirmationOpen}
        onClose={handleConfirmationDialogClose}
        setBirthday={setBirthday}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setWalletAddress={setWalletAddress}
        onSubmit={handleConfirmationDialog}
      />

      <PatientSignUpInfo
        firstName={firstName}
        lastName={lastName}
        birthday={birthday}
        walletAddress={walletAddress}
        isOpen={isInfoOpen}
        onClose={handleInfoDialogClose}
      />
    </div>
  );
}
