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
import { useEffect } from "react";

const Application = () => {
  const [setNavbar] = useOutletContext();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const sampleData = require("./sampleData.json");
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const userData = sampleData[id]?.sampleDetails;

  useEffect(() => setNavbar(true), [setNavbar]);
  useEffect(() => {
    if (!userData) {
      navigate("/home");
    }
  }, [navigate, userData]);

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
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ApplicationSection title="Basic Details">
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
            </Box>
            <StepGuide />
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default Application;
