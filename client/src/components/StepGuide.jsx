import { Paper, Stepper, Step, StepButton, Box } from "@mui/material";
import { Link } from "react-scroll";

const steps = [
  { name: "Basic Details" },
  { name: "Educational Qualification" },
  { name: "Professional Experience" },
  { name: "Other Achievements" },
  { name: "Declaration" },
];

const StepGuide = ({ isMobile, activeStep, setActiveStep }) => {
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
        {isMobile ?? (
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
