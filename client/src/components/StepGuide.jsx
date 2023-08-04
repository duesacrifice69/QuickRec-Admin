import {
  useTheme,
  Paper,
  Stepper,
  Step,
  StepButton,
  Button,
  MobileStepper,
  Box,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Link } from "react-scroll";

const handleBack = () => {};
const handleNext = () => {};

const steps = [
  { name: "Basic Details" },
  { name: "Educational Qualification" },
  { name: "Professional Experience" },
  { name: "Other Achievements" },
  { name: "Declaration" },
];

const StepGuide = ({ isMobile, activeStep, setActiveStep }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minWidth: "180px",
      }}
    >
      <Paper
        sx={{
          position: "fixed",
          display: "flex",
          minWidth: "180px",
          maxHeight: "600px",
          justifyContent: "center",
        }}
      >
        {isMobile ? (
          <MobileStepper
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1 }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        ) : (
          <Stepper
            nonLinear
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              pt: "1rem",
              pb: "1rem",
              "& .MuiStepper-root": {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              },
              "& .MuiStepConnector-root": {
                display: "block",
                margin: "auto",
              },
              "& .MuiStepConnector-line": {
                height: "100%",
              },
              "& .MuiStep-root": {
                margin: "auto",
              },
            }}
          >
            {steps.map((label, index) => (
              <Step
                key={label.name}
                sx={{
                  width: "100%",
                  "& .MuiStepLabel-root": {
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "0.5rem",
                  },
                  "& .MuiStepLabel-iconContainer": {
                    padding: "0",
                  },
                }}
              >
                <Link
                  to={label.name}
                  spy={true}
                  smooth={true}
                  duration={500}
                  onSetActive={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                >
                  <StepButton
                    color="inherit"
                    onClick={() => setTimeout(() => setActiveStep(index), 50)}
                  >
                    {label.name}
                  </StepButton>
                </Link>
              </Step>
            ))}
          </Stepper>
        )}
      </Paper>
    </Box>
  );
};

export default StepGuide;
