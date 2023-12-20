import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import {
  StepGuide,
  ApplicationSection,
  ButtonComp,
  FileViewer,
  Input,
  Error,
} from "../../components";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  useReviewApplicationMutation,
  useApproveDetailMutation,
  useGetAppDetailsQuery,
} from "../../state/api";

const initState = {
  status: "PENDING",
  remarks: "",
};

const Application = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [application, setApplication] = useState(initState);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [setActive] = useOutletContext();
  const [approveDetail] = useApproveDetailMutation();
  const [reviewApplication] = useReviewApplicationMutation();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const location = useLocation();
  const { userId, applicationId, vacancyId } = location?.state;
  const navigate = useNavigate();
  const { data: applicationData, isLoading: applicationIsLoading } =
    useGetAppDetailsQuery({ userId, applicationId });
  const { basicDetails, education, experience, otherDetails } =
    !applicationIsLoading && applicationData?.data;

  useEffect(() => setActive("0"), [setActive]);
  useEffect(() => {
    if (!userId || !applicationId) {
      navigate("/home");
    }
  }, [navigate, userId, applicationId]);

  useEffect(() => {
    !applicationIsLoading &&
      setApplication({
        status: basicDetails.Status,
        remarks: basicDetails.Remarks ?? "",
      });
  }, [applicationIsLoading, basicDetails]);

  const handleChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value,
    });
  };

  const handleApprove = async (e, stepId, detailId) => {
    approveDetail({
      applicationId,
      stepId,
      detailId,
      isApproved: e.target.checked ? 1 : 0,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    const result = await reviewApplication({
      applicationId,
      status: application.status,
      remarks: application.remarks,
    });
    setLoading(false);
    result?.error
      ? setError(result.error?.data?.message)
      : navigate("/applications", { state: { vacancyId } });
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.main,
        pr: "10px",
        pb: "2rem",
        minHeight: "80vh",
      }}
    >
      {applicationData && !applicationIsLoading ? (
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
                isApproved={basicDetails.isApproved}
                handleApprove={(e) =>
                  handleApprove(e, 1, basicDetails.basicDetailsId)
                }
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
                        fontSize: isMobile ? "1rem" : "1.2rem",
                        fontWeight: 600,
                      }}
                    >
                      {basicDetails.title} {basicDetails.nameWithInitials}
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
                      {basicDetails.nic}
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
                      {basicDetails.email}
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
                      {basicDetails.sex}
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
                      {basicDetails.mobileNo1},{basicDetails.mobileNo2}
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
                      {basicDetails.civilStatus}
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
                      {basicDetails.nationality}
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
                      {dayjs(basicDetails.dateOfBirth).format("DD/MM/YYYY")}
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
                      {basicDetails.religion}
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
                      {basicDetails.addressLine1},{basicDetails.addressLine2}
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
                      {basicDetails.ethnicity}
                    </Typography>
                  </Grid>
                </Grid>
              </ApplicationSection>
              {education && (
                <ApplicationSection
                  title="Educational Qualification"
                  details={education}
                  handleApprove={(e, detailId) => handleApprove(e, 2, detailId)}
                />
              )}
              {experience && (
                <ApplicationSection
                  title="Professional Experience"
                  details={experience}
                  handleApprove={(e, detailId) => handleApprove(e, 3, detailId)}
                />
              )}
              {otherDetails && (
                <ApplicationSection
                  title="Other Achievements"
                  details={otherDetails}
                  handleApprove={(e, detailId) => handleApprove(e, 4, detailId)}
                />
              )}
              <ButtonComp
                sx={{ p: "0.5rem 1rem " }}
                align="center"
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
                  <FileViewer label="CV" fileName={basicDetails?.CVPath} />
                  <FileViewer label="NIC" fileName={basicDetails?.NICPath} />
                  <FileViewer
                    label="Birth Certificate"
                    fileName={basicDetails?.BCPath}
                  />
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
                      options={[
                        { value: "SELECTED", text: "Selected" },
                        { value: "REJECTED", text: "Rejected" },
                        { value: "PENDING", text: "Pending" },
                      ]}
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
                      sx={{ p: "0.5rem 1rem" }}
                      align="center"
                      loading={loading}
                      onClick={handleSave}
                    >
                      Save
                    </ButtonComp>
                  </Grid>
                  <Error error={error} setError={setError} />
                </Grid>
              </ApplicationSection>
            </Box>
            <StepGuide activeStep={activeStep} setActiveStep={setActiveStep} />
          </Box>
        </Container>
      ) : (
        <div style={{ width: "min-content", margin: "auto" }}>
          <CircularProgress size="5rem" />
        </div>
      )}
    </Box>
  );
};

export default Application;
