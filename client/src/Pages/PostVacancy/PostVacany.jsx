import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Input from "../../components/Input";
import ButtonComp from "../../components/ButtonComp";
import SelectComp from "../../components/SelectComp";
import * as api from "../../api";
import { useSelector } from "react-redux";
import { getValue } from "../../utils/enum";

const initState = {
  VacancyName: "",
  RecruitmentType: "",
  SalaryGroupId: "",
  BoardGradeId: "",
  PublishedDate: Date().toString(),
  ClosingDate: null,
  NoOfVacancies: "1",
  PlannedInterViewDate: null,
  AgeLimit: "45",
  Remarks: "",
  ExpectedNoOfApplicants: "1",
  AdvertismentPath: "",
  Status: "ACT",
};
const { vacancies } = require("../Vacancies/vacancies.json");

const PostVacancy = ({ isEditing, setIsEditing, vacancyId }) => {
  const [setActive] = useOutletContext();
  const { UserId } = useSelector((state) => state.userContext.data.result);
  const [vacancy, setVacancy] = useState({
    ...initState,
    userId: UserId,
  });
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => setActive("2"), [setActive]);

  useEffect(() => {
    if (vacancyId) {
      const vacancyData = vacancies.find(
        (vacancy) => vacancy.vacancyId === vacancyId
      );
      setVacancy({
        Status: "",
        PlannedInterViewDate: null,
        expectedNoOfApplicants: "1",
        NoOfVacancies: "1",
        AgeLimit: "45",
        Remarks: "",
        ...vacancyData,
      });
    }
  }, [vacancyId]);

  const handleChange = (e) => {
    setVacancy({
      ...vacancy,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.createVacancy(vacancy);
      isEditing && setIsEditing(false);
      navigate("/vacancies");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.main, pb: "3rem" }}>
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
            Define Vacancy for Recruitment
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container rowSpacing={3} sx={{ m: "1rem auto" }}>
              <Grid item xs={12}>
                <Typography>
                  Select the post and define details regarding the vacancy.
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
                    sx={{ fontWeight: 600, fontSize: "1.1rem", mb: "1rem" }}
                  >
                    {vacancy.RecruitmentType &&
                      getValue(vacancy.RecruitmentType) + " to :"}
                    <span style={{ color: theme.palette.primary[500] }}>
                      {vacancy.VacancyName}
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Vacancy :</Typography>
                </Grid>
                <Input
                  name="VacancyName"
                  value={vacancy.VacancyName}
                  handleChange={handleChange}
                  required
                  half
                />
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Recruitment Method :</Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <FormControl size="small">
                    <SelectComp
                      name="RecruitmentType"
                      value={vacancy.RecruitmentType}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="INT">Internal Recruitment</MenuItem>
                      <MenuItem value="EXT">External Recruitment</MenuItem>
                      <MenuItem value="PRO">Promotion Recruitment</MenuItem>
                    </SelectComp>
                  </FormControl>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Closing Date of Application :</Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <DateField
                    value={vacancy.ClosingDate && dayjs(vacancy.ClosingDate)}
                    required
                    onChange={(newValue) => {
                      handleChange({
                        target: {
                          name: "ClosingDate",
                          value: newValue.$d.toDateString(),
                        },
                      });
                    }}
                    sx={{
                      width: "100%",
                      backgroundColor: (theme) => theme.palette.background.main,
                    }}
                    slotProps={{
                      textField: { size: "small" },
                    }}
                  />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Expected Date of Interview :</Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <DateField
                    value={
                      vacancy.PlannedInterViewDate &&
                      dayjs(vacancy.PlannedInterViewDate)
                    }
                    required
                    onChange={(newValue) => {
                      handleChange({
                        target: {
                          name: "PlannedInterViewDate",
                          value: newValue.$d.toDateString(),
                        },
                      });
                    }}
                    sx={{
                      width: "100%",
                      backgroundColor: (theme) => theme.palette.background.main,
                    }}
                    slotProps={{
                      textField: { size: "small" },
                    }}
                  />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Expected No. of Applicants :</Typography>
                </Grid>
                <Input
                  type="number"
                  name="ExpectedNoOfApplicants"
                  value={vacancy.ExpectedNoOfApplicants}
                  handleChange={handleChange}
                  half
                />
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>No. of Vacancies :</Typography>
                </Grid>
                <Input
                  type="number"
                  name="NoOfVacancies"
                  value={vacancy.NoOfVacancies}
                  handleChange={handleChange}
                  half
                />
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Age Limit :</Typography>
                </Grid>
                <Input
                  type="number"
                  name="AgeLimit"
                  value={vacancy.AgeLimit}
                  handleChange={handleChange}
                  half
                />
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Advertisment :</Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Input
                    name="AdvertismentPath"
                    value={vacancy.AdvertismentPath}
                    type="file"
                    handleChange={handleChange}
                  />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Remarks :</Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <TextField
                    sx={{ backgroundColor: theme.palette.background.main }}
                    name="Remarks"
                    value={vacancy.Remarks}
                    onChange={handleChange}
                    size="medium"
                    fullWidth
                    multiline
                    minRows={5}
                    maxRows={8}
                  />
                </Grid>

                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography sx={{ pt: "0.5rem" }}>Active :</Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Switch
                    checked={getValue(vacancy.Status)}
                    onChange={(e) => {
                      handleChange({
                        target: {
                          name: "Status",
                          value: e.target.checked ? "ACT" : "INA",
                        },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <hr />
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Salary Group :</Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <FormControl size="small">
                    <SelectComp
                      name="SalaryGroupId"
                      value={vacancy.SalaryGroupId}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="1">HM 1-1</MenuItem>
                      <MenuItem value="2">HM 1-2</MenuItem>
                      <MenuItem value="3">HM 1-3</MenuItem>
                    </SelectComp>
                  </FormControl>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Board Grade :</Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <FormControl size="small">
                    <SelectComp
                      name="BoardGradeId"
                      value={vacancy.BoardGradeId}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="1">G1</MenuItem>
                      <MenuItem value="2">G2</MenuItem>
                      <MenuItem value="3">G3</MenuItem>
                    </SelectComp>
                  </FormControl>
                </Grid>
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
