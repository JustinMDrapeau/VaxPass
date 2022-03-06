import React, { useEffect, useState } from "react";
import { AppBar, Box, Button, Card, Container, Grid, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
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

  const [birthday, setBirthday] = React.useState<Date | null>(new Date());
  const [dateAdministered, setDateAdministered] = React.useState<Date | null>(new Date());

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
  const [phaseNumber, setPhaseNumber] = useState<number>(1);

  const [vaccineDisabled, setVaccineDisabled] = useState<boolean | undefined>(true);

  const [signUpPatientOpen, setSignUpPatientOpen] = useState(false);

  useEffect(() => {
    ClinicDataService.getClinicInfo(clinicPublic)
      .then((res: any) => {
        setClinicName(res.name);
        setClinicEmail(res.email);
        setClinicPhysicalAddress(res.p_address);
      })
      .catch((err: any) => console.log(err));
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
          setVaccineDisabled(false);
        } else {
          console.log("HASHES ARE NOT EQUAL!");
        }
      })
      .catch((err: any) => console.log(err));
  };

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
    const vaccineAdministeredDate = dateAdministered?.toDateString();
    ClinicDataService.mintAndTransfer(
      clinicPublic,
      clinicPrivate,
      product,
      lotNumber,
      phaseNumber,
      vaccineAdministeredDate as string,
      walletAddress
    ).then((res) => {
      console.log(res);
      console.log("Vaccine administered");
    });
  };

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
            {/* <Button color="inherit">Verify Clinic</Button> */}
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
                    Wallet Address:
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    style={{ wordBreak: "break-word" }}
                  >
                    {clinicPublic}
                  </Typography>
                  <br />
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
                  />

                  <TextField
                    required
                    id="last-name-field"
                    value={lastName}
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date of Birth"
                      inputFormat="MM/dd/yyyy"
                      value={birthday}
                      onChange={setBirthday}
                      renderInput={(params) => <TextField {...params} />}
                      disableFuture={true}
                    />
                  </LocalizationProvider>

                  <TextField
                    required
                    id="wallet-address-field"
                    label="Wallet Address"
                    value={walletAddress}
                    type="text"
                    variant="outlined"
                    onChange={(e) => setWalletAddress(e.target.value)}
                    style={{ minWidth: "45%" }}
                  />
                  <Button
                    variant="contained"
                    style={{ minHeight: "53px" }}
                    onClick={verifyPatient}
                  >
                    Verify Patient
                  </Button>
                  <Button
                    variant="contained"
                    style={{ minHeight: "53px" }}
                    onClick={()=>setSignUpPatientOpen(true)}
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
                    onChange={(e) => setLotNumber(e.target.value)}
                    style={{ maxWidth: "20%" }}
                    disabled={vaccineDisabled}
                  />

                  <TextField
                    required
                    id="vaccine-phase-number"
                    label="Phase #"
                    type="text"
                    variant="outlined"
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
                  <Button
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
                  </Button>
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
