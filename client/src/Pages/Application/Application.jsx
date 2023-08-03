import { useOutletContext, useParams } from "react-router-dom";
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
const { sampleDetails } = require("./sampleData.json");

const Application = () => {
  const [setNavbar] = useOutletContext();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => setNavbar(true), []);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.main,
        pr: "10px",
        pb: "2rem",
      }}
    >
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
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ p: "1rem" }}
              >
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: isMobile ? "1.2rem" : "1.5rem",
                      fontWeight: 600,
                    }}
                  >
                    {sampleDetails.basicDetails.title +
                      sampleDetails.basicDetails.nameWithInitials}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 5 : 2}>
                  <Typography fontSize={isMobile ? "14px" : "16px"}>
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
                    {sampleDetails.basicDetails.nic}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 5 : 2}>
                  <Typography fontSize={isMobile ? "14px" : "16px"}>
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
                    {sampleDetails.basicDetails.email}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 5 : 2}>
                  <Typography fontSize={isMobile ? "14px" : "16px"}>
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
                    {sampleDetails.basicDetails.sex}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 5 : 2}>
                  <Typography fontSize={isMobile ? "14px" : "16px"}>
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
                    +94{sampleDetails.basicDetails.mobileNo1}, +94
                    {sampleDetails.basicDetails.mobileNo2}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 5 : 2}>
                  <Typography fontSize={isMobile ? "14px" : "16px"}>
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
                    {sampleDetails.basicDetails.civilStatus}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 5 : 2}>
                  <Typography fontSize={isMobile ? "14px" : "16px"}>
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
                    {sampleDetails.basicDetails.nationality}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 5 : 2}>
                  <Typography fontSize={isMobile ? "14px" : "16px"}>
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
                    {sampleDetails.basicDetails.dateOfBirth}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 5 : 2}>
                  <Typography fontSize={isMobile ? "14px" : "16px"}>
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
                    {sampleDetails.basicDetails.religion}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 5 : 2}>
                  <Typography fontSize={isMobile ? "14px" : "16px"}>
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
                    {sampleDetails.basicDetails.AddressLine1},
                    {sampleDetails.basicDetails.AddressLine2}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 5 : 2}>
                  <Typography fontSize={isMobile ? "14px" : "16px"}>
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
                    {sampleDetails.basicDetails.ethnicity}
                  </Typography>
                </Grid>
              </Grid>
            </ApplicationSection>
            <ApplicationSection
              title="Education Qualifications"
              details={sampleDetails.eduQualification}
            ></ApplicationSection>
            <ApplicationSection
              title="Professional Experience"
              details={sampleDetails.experience}
            ></ApplicationSection>
            <ApplicationSection
              title="Other Achievements"
              details={sampleDetails.otherAchievements}
            ></ApplicationSection>
            <h1>{id}</h1>
          </Box>
          <StepGuide />
        </Box>
      </Container>
    </Box>
  );
};

export default Application;
