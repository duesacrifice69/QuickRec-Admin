import { useOutletContext, useParams } from "react-router-dom";
import StepGuide from "../../components/StepGuide";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
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
            <ApplicationSection title="Basic Details"></ApplicationSection>
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
