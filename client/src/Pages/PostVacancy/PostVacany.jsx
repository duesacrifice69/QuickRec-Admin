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
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Input from "../../components/Input";
import ButtonComp from "../../components/ButtonComp";

const initState = {
  group: "",
  recruitmentMethod: "",
  closingDateOfApplication: null,
  expectedDateOfInterview: null,
  expectedNoOfApplicants: "1",
  noOfVacancies: "1",
  ageLimit: "45",
  remarks: "",
};

const PostVacancy = () => {
  const [setIsNavBar, setActive] = useOutletContext();
  const [vacancy, setVacancy] = useState(initState);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => setIsNavBar(true), [setIsNavBar]);
  useEffect(() => setActive("2"), [setActive]);

  const handleChange = (e) => {
    setVacancy({
      ...vacancy,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/vacancies");
  };

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
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: 600 }}>Group :</Typography>
              </Grid>
              <Grid item xs={3}>
                <FormControl size="small">
                  <Select
                    name="group"
                    value={vacancy.group}
                    onChange={handleChange}
                    required
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    sx={{
                      minWidth: "140px",
                      minHeight: "1.4rem",
                      backgroundColor: (theme) => theme.palette.background.main,
                    }}
                  >
                    <MenuItem value="test">test</MenuItem>
                  </Select>
                </FormControl>
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
                    Promotion to :
                    <span style={{ color: theme.palette.primary[500] }}>
                      Analyst Programmer --xx(xx-xx)
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Recruitment Method :</Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <FormControl size="small">
                    <Select
                      name="recruitmentMethod"
                      value={vacancy.recruitmentMethod}
                      onChange={handleChange}
                      required
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      sx={{
                        minWidth: "140px",
                        minHeight: "1.4rem",
                        backgroundColor: (theme) =>
                          theme.palette.background.main,
                      }}
                    >
                      <MenuItem value="test">test</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Closing Date of Application :</Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <DateField
                    value={
                      vacancy.closingDateOfApplication &&
                      dayjs(vacancy.closingDateOfApplication)
                    }
                    required
                    onChange={(newValue) => {
                      handleChange({
                        target: {
                          name: "closingDateOfApplication",
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
                      vacancy.expectedDateOfInterview &&
                      dayjs(vacancy.expectedDateOfInterview)
                    }
                    required
                    onChange={(newValue) => {
                      handleChange({
                        target: {
                          name: "expectedDateOfInterview",
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
                  name="expectedNoOfApplicants"
                  value={vacancy.expectedNoOfApplicants}
                  handleChange={handleChange}
                  half
                />
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>No. of Vacancies :</Typography>
                </Grid>
                <Input
                  type="number"
                  name="noOfVacancies"
                  value={vacancy.noOfVacancies}
                  handleChange={handleChange}
                  half
                />
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Age Limit :</Typography>
                </Grid>
                <Input
                  type="number"
                  name="ageLimit"
                  value={vacancy.ageLimit}
                  handleChange={handleChange}
                  half
                />
                <Grid item xs={isMobile ? 12 : 6}>
                  <Typography>Remarks :</Typography>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <TextField
                    sx={{ backgroundColor: theme.palette.background.main }}
                    name="remarks"
                    value={vacancy.remarks}
                    onChange={handleChange}
                    size="medium"
                    fullWidth
                    multiline
                    minRows={5}
                    maxRows={8}
                  />
                </Grid>
                <Grid item xs={12}>
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
