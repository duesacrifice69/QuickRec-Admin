import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import StepGuide from "../../components/StepGuide";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ApplicationSection from "../../components/ApplicationSection";
import ButtonComp from "../../components/ButtonComp";
import { useEffect, useState } from "react";
import FileViewer from "../../components/FileViewer";
import Input from "../../components/Input";

const initState = {
  status: "pending",
  remarks: "",
};

const Application = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [application, setApplication] = useState(initState);
  const [setActive] = useOutletContext();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const sampleData = require("./sampleData.json");
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const userData = sampleData[id]?.sampleDetails;

  useEffect(() => setActive("0"), [setActive]);
  useEffect(() => {
    if (!userData) {
      navigate("/home");
    }
  }, [navigate, userData]);

  const handleChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    navigate("/home");
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.main,
        pr: "10px",
        pb: "2rem",
      }}
    >
      {userData && (
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "1rem",
              pt: "1rem",
            }}
          >
            <Box
              sx={{
                display: activeStep <= 3 ? "flex" : "none",
                flexDirection: "column",
              }}
            >
              <ApplicationSection
                title="Basic Details"
                sx={{ mt: "0", mb: "4rem", wordWrap: "break-word" }}
              >
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={{ xs: 0, sm: 2, md: 3 }}
                  sx={{ p: "1rem" }}
                >
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        fontSize: isMobile ? "1.2rem" : "1.5rem",
                        fontWeight: 600,
                      }}
                    >
                      {userData.basicDetails.title +
                        userData.basicDetails.nameWithInitials}
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 5 : 2}>
                    <Typography fontSize={isMobile ? "12px" : "14px"}>
                      NIC Number
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 7 : 4}>
                    <Typography
                      fontSize={isMobile ? "14px" : "16px"}
                      sx={{
                        fontWeight: 550,
                        color: theme.palette.secondary[700],
                      }}
                    >
                      {userData.basicDetails.nic}
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 5 : 2}>
                    <Typography fontSize={isMobile ? "12px" : "14px"}>
                      Emalil Address
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 7 : 4}>
                    <Typography
                      fontSize={isMobile ? "14px" : "16px"}
                      sx={{
                        fontWeight: 550,
                        color: theme.palette.secondary[700],
                      }}
                    >
                      {userData.basicDetails.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 5 : 2}>
                    <Typography fontSize={isMobile ? "12px" : "14px"}>
                      Sex
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 7 : 4}>
                    <Typography
                      fontSize={isMobile ? "14px" : "16px"}
                      sx={{
                        fontWeight: 550,
                        color: theme.palette.secondary[700],
                      }}
                    >
                      {userData.basicDetails.sex}
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 5 : 2}>
                    <Typography fontSize={isMobile ? "12px" : "14px"}>
                      Mobile No
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 7 : 4}>
                    <Typography
                      fontSize={isMobile ? "14px" : "16px"}
                      sx={{
                        fontWeight: 550,
                        color: theme.palette.secondary[700],
                      }}
                    >
                      +94{userData.basicDetails.mobileNo1}, +94
                      {userData.basicDetails.mobileNo2}
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 5 : 2}>
                    <Typography fontSize={isMobile ? "12px" : "14px"}>
                      Civil Status
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 7 : 4}>
                    <Typography
                      fontSize={isMobile ? "14px" : "16px"}
                      sx={{
                        fontWeight: 550,
                        color: theme.palette.secondary[700],
                      }}
                    >
                      {userData.basicDetails.civilStatus}
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 5 : 2}>
                    <Typography fontSize={isMobile ? "12px" : "14px"}>
                      Nationality
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 7 : 4}>
                    <Typography
                      fontSize={isMobile ? "14px" : "16px"}
                      sx={{
                        fontWeight: 550,
                        color: theme.palette.secondary[700],
                      }}
                    >
                      {userData.basicDetails.nationality}
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 5 : 2}>
                    <Typography fontSize={isMobile ? "12px" : "14px"}>
                      Date of Birth
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 7 : 4}>
                    <Typography
                      fontSize={isMobile ? "14px" : "16px"}
                      sx={{
                        fontWeight: 550,
                        color: theme.palette.secondary[700],
                      }}
                    >
                      {userData.basicDetails.dateOfBirth}
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 5 : 2}>
                    <Typography fontSize={isMobile ? "12px" : "14px"}>
                      Religion
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 7 : 4}>
                    <Typography
                      fontSize={isMobile ? "14px" : "16px"}
                      sx={{
                        fontWeight: 550,
                        color: theme.palette.secondary[700],
                      }}
                    >
                      {userData.basicDetails.religion}
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 5 : 2}>
                    <Typography fontSize={isMobile ? "12px" : "14px"}>
                      Address
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 7 : 4}>
                    <Typography
                      fontSize={isMobile ? "14px" : "16px"}
                      sx={{
                        fontWeight: 550,
                        color: theme.palette.secondary[700],
                      }}
                    >
                      {userData.basicDetails.AddressLine1},
                      {userData.basicDetails.AddressLine2}
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 5 : 2}>
                    <Typography fontSize={isMobile ? "12px" : "14px"}>
                      Ethinicity
                    </Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 7 : 4}>
                    <Typography
                      fontSize={isMobile ? "14px" : "16px"}
                      sx={{
                        fontWeight: 550,
                        color: theme.palette.secondary[700],
                      }}
                    >
                      {userData.basicDetails.ethnicity}
                    </Typography>
                  </Grid>
                </Grid>
              </ApplicationSection>
              <ApplicationSection
                title="Educational Qualification"
                details={userData.eduQualification}
              />
              <ApplicationSection
                title="Professional Experience"
                details={userData.experience}
              />
              <ApplicationSection
                title="Other Achievements"
                details={userData.otherAchievements}
              />
              <ButtonComp
                sx={{ display: "block", m: "auto", p: "0.5rem 1rem " }}
                onClick={() => setActiveStep(4)}
              >
                Save & Next
              </ButtonComp>
            </Box>
            <Box
              sx={{
                display: activeStep === 4 ? "flex" : "none",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <ApplicationSection
                title="Declaration"
                sx={{ mt: "0", mb: "4rem" }}
                details={[]}
              >
                <Box
                  sx={{
                    padding: isMobile ? "2rem" : "1rem 0",
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    width: "100%",
                    rowGap: "1rem",
                    justifyContent: "space-around",
                  }}
                >
                  <FileViewer label="CV" />
                  <FileViewer label="NIC" />
                  <FileViewer label="Birth Certificate" />
                </Box>
                <Grid container spacing={5} sx={{ p: "2rem" }}>
                  <Grid item xs={3}>
                    <Typography>Status:</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Input
                      name="status"
                      type="select"
                      required
                      value={application.status}
                      handleChange={handleChange}
                      options={["Approved", "Rejected", "Pending"]}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Remarks:</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Input
                      name="remarks"
                      value={application.remarks}
                      handleChange={handleChange}
                      size="medium"
                      multiline
                      minRows={5}
                      maxRows={8}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonComp
                      sx={{
                        display: "block",
                        m: "1rem auto",
                        p: "0.5rem 1rem ",
                      }}
                      onClick={handleSave}
                    >
                      Save
                    </ButtonComp>
                  </Grid>
                </Grid>
              </ApplicationSection>
            </Box>
            <StepGuide activeStep={activeStep} setActiveStep={setActiveStep} />
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default Application;
