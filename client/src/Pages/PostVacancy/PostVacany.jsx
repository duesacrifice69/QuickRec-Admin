import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
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
import * as api from "../../api";
import { useSelector } from "react-redux";
import {
  useGetBoardGradesQuery,
  useGetSalaryGroupsQuery,
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
  const { UserId } = useSelector((state) => state.userContext.data.result);
  const { data: salaryGroups, isLoading: salaryGroupsIsLoading } =
    useGetSalaryGroupsQuery();
  const { data: boardGrades, isLoading: boardGradesIsLoading } =
    useGetBoardGradesQuery();
  const [vacancy, setVacancy] = useState({
    ...initState,
    userId: UserId,
  });
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

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
  }, [editingVacancy]);

  const handleChange = (e) => {
    setVacancy({
      ...vacancy,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createVacancy(vacancy);
      isEditing && setIsEditing(false);
      navigate("/vacancies");
    } catch (error) {
      console.log(error);
    }
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
                  options={salaryGroups}
                  loading={salaryGroupsIsLoading}
                  autocomplete
                  inline
                  required
                />
                <Input
                  name="BoardGradeId"
                  label="Board Grade :"
                  type="select"
                  options={boardGrades}
                  loading={boardGradesIsLoading}
                  value={vacancy.BoardGradeId}
                  handleChange={handleChange}
                  autocomplete
                  inline
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
              </Grid>
            </Paper>
          </form>
        </div>
      </Container>
    </Box>
  );
};

export default PostVacancy;
