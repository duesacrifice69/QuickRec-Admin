import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Grid,
  Paper,
  Switch,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Input from "../../components/Input";
import ButtonComp from "../../components/ButtonComp";
import { useSelector } from "react-redux";
import {
  useCreateVacancyMutation,
  useGetMasterDataQuery,
} from "../../state/api";

const initState = {
  VacancyName: "",
  RecruitmentType: "",
  SalaryGroupId: "",
  BoardGradeId: "",
  PublishedDate: Date().toString(),
  ClosingDate: null,
  NoOfVacancies: 1,
  PlannedInterViewDate: null,
  AgeLimit: 45,
  Remarks: "",
  ExpectedNoOfApplicants: 1,
  AdvertismentPath: "",
  Status: "ACT",
};

const PostVacancy = ({ isEditing, setIsEditing, editingVacancy }) => {
  const theme = useTheme();
  const [setActive] = useOutletContext();
  const [attachment, setAttachment] = useState(null);
  const [response, setResponse] = useState();
  const [createVacancy] = useCreateVacancyMutation();
  const { UserId } = useSelector((state) => state.userContext.data.result);
  const { data: masterData, isLoading: masterDataIsLoading } =
    useGetMasterDataQuery();
  const [vacancy, setVacancy] = useState({
    ...initState,
    userId: UserId,
  });
  const isMobile = useMediaQuery("(max-width: 600px)");
  const recruitmentOptions = [
    { text: "Internal Recruitment", value: "INT" },
    { text: "External Recruitment", value: "EXT" },
    { text: "Promotion Recruitment", value: "PRO" },
    {
      text: "Internal and External Recruitment",
      value: "INT_EXT",
    },
  ];

  useEffect(() => setActive("2"), [setActive]);

  useEffect(() => {
    editingVacancy &&
      setVacancy({
        ...editingVacancy,
        RecruitmentType: recruitmentOptions.find(
          (v) => v.text === editingVacancy.RecruitmentType
        ).value,
        Status: editingVacancy.Status === "Open" ? "ACT" : "INA",
      });
    // eslint-disable-next-line
  }, [editingVacancy]);

  const handleChange = (e) => {
    setVacancy({
      ...vacancy,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createVacancy(vacancy, attachment);
    console.log(result);
    setResponse(result);
    setVacancy(initState);
    setTimeout(() => {
      setResponse(null);
    }, 5000);
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.main,
        pb: "3rem",
      }}
    >
      <Container maxWidth="md">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              mt: "1rem",
            }}
          >
            {isEditing ? "Edit" : "Define"} Vacancy for Recruitment
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container rowSpacing={3} sx={{ m: "1rem auto" }}>
              <Grid item xs={12}>
                <Typography>
                  Select the post and {isEditing ? "edit" : "define"} details
                  regarding the vacancy.
                </Typography>
              </Grid>
            </Grid>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                p: "2rem 3vw",
                width: "100%",
              }}
            >
              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      mb: "1rem",
                    }}
                  >
                    {vacancy.RecruitmentType &&
                      recruitmentOptions.find(
                        (v) => v.value === vacancy.RecruitmentType
                      ).text + " to : "}
                    <span
                      style={{
                        color: theme.palette.primary[500],
                      }}
                    >
                      {vacancy.VacancyName}
                    </span>
                  </Typography>
                </Grid>
                <Input
                  name="VacancyName"
                  value={vacancy.VacancyName}
                  handleChange={handleChange}
                  label="Vacancy :"
                  required
                  inline
                />
                <Input
                  name="RecruitmentType"
                  type="select"
                  options={recruitmentOptions}
                  value={vacancy.RecruitmentType}
                  handleChange={handleChange}
                  label="Recruitment Method :"
                  required
                  inline
                />
                <Input
                  name="ClosingDate"
                  type="date"
                  value={vacancy.ClosingDate}
                  handleChange={handleChange}
                  label="Closing Date of Application :"
                  required
                  inline
                />
                <Input
                  name="PlannedInterViewDate"
                  type="date"
                  value={vacancy.PlannedInterViewDate}
                  handleChange={handleChange}
                  label="Expected Date of Interview :"
                  required
                  inline
                />
                {/* <Input
                  type="number"
                  name="ExpectedNoOfApplicants"
                  label="Expected No. of Applicants :"
                  value={vacancy.ExpectedNoOfApplicants}
                  handleChange={handleChange}
                  required
                  inline
                /> */}
                <Input
                  type="number"
                  name="NoOfVacancies"
                  label="No. of Vacancies :"
                  value={vacancy.NoOfVacancies}
                  handleChange={handleChange}
                  inline
                  required
                />
                <Input
                  type="number"
                  name="AgeLimit"
                  label="Age Limit :"
                  value={vacancy.AgeLimit}
                  handleChange={handleChange}
                  inline
                  required
                />
                <Input
                  name="AdvertismentPath"
                  label="Advertisment :"
                  value={vacancy.AdvertismentPath}
                  setAttachment={setAttachment}
                  type="file"
                  handleChange={handleChange}
                  inline
                />
                <Input
                  name="Remarks"
                  label="Remarks :"
                  value={vacancy.Remarks}
                  handleChange={handleChange}
                  size="medium"
                  multiline
                  inline
                  minRows={5}
                  maxRows={8}
                />
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography sx={{ pt: "0.5rem", fontWeight: 500 }}>
                    Active :
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Switch
                    checked={vacancy.Status === "ACT" ? true : false}
                    onChange={(e) => {
                      handleChange({
                        target: {
                          name: "Status",
                          value: e.target.checked === true ? "ACT" : "INA",
                        },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <hr />
                </Grid>
                <Input
                  name="SalaryGroupId"
                  label="Salary Group :"
                  type="select"
                  value={vacancy.SalaryGroupId}
                  handleChange={handleChange}
                  options={masterData?.data?.salaryGroups}
                  loading={masterDataIsLoading}
                  autocomplete
                  inline
                  required
                />
                <Input
                  name="BoardGradeId"
                  label="Board Grade :"
                  type="select"
                  options={masterData?.data?.boardGrades}
                  loading={masterDataIsLoading}
                  value={vacancy.BoardGradeId}
                  handleChange={handleChange}
                  autocomplete
                  inline
                  required
                />
                <Grid item xs={12}>
                  {!isEditing ? (
                    <ButtonComp
                      type="submit"
                      sx={{
                        display: "block",
                        m: "2rem 0",
                        ml: "auto",
                        p: "1rem ",
                      }}
                    >
                      Post Vacancy
                    </ButtonComp>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        gap: "10px",
                      }}
                    >
                      <ButtonComp onClick={handleCancel}>Cancel</ButtonComp>
                      <ButtonComp type="submit">Save</ButtonComp>
                    </div>
                  )}
                </Grid>
                {response && (
                  <Typography
                    sx={{
                      width: "100%",
                      fontSize: "0.8rem",
                      m: "1rem",
                      p: "1rem",
                      color: response.error ? "#ff0000" : "#12d104",
                      border: `1px solid ${
                        response.error ? "#ff0000" : "#12d104"
                      }`,
                      borderRadius: "5px",
                    }}
                  >
                    {response.message}
                  </Typography>
                )}
              </Grid>
            </Paper>
          </form>
        </div>
        {response && (
          <Typography
            sx={{
              fontSize: "0.8rem",
              m: "1rem",
              p: "1rem",
              color: "#ff0000",
              border: "1px solid red",
              borderRadius: "5px",
            }}
          >
            {response.message}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default PostVacancy;
