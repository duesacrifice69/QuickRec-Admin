import {
  Paper,
  Container,
  Typography,
  InputBase,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Vacancy from "../../components/Vacancy";

const vacancies = [
  {
    vacancyId: 1234,
    title: "Deputy General Manager",
    status: "Open",
    recType: "External Recrutiement",
    closingDate: "2023 sep 20",
    slaryGroup: "HM 1-1",
    boardGrade: "G2",
    advertisement: "/path",
    NoOfApplied: "7",
    postedDays: 2,
  },
  {
    vacancyId: 5678,
    title: "Assistant General Manager",
    status: "Open",
    recType: "External Recrutiement",
    closingDate: "2023 sep 20",
    slaryGroup: "HM 1-1",
    boardGrade: "G2",
    advertisement: "/path",
    NoOfApplied: "7",
    postedDays: 2,
  },
  {
    vacancyId: 8498,
    title: "General Manager",
    status: "Open",
    recType: "External Recrutiement",
    closingDate: "2023 sep 20",
    slaryGroup: "HM 1-1",
    boardGrade: "G2",
    advertisement: "/path",
    NoOfApplied: "7",
    postedDays: 2,
  },
  {
    vacancyId: 9101,
    title: "Deputy General Manager",
    status: "Open",
    recType: "External Recrutiement",
    closingDate: "2023 sep 20",
    slaryGroup: "HM 1-1",
    boardGrade: "G2",
    advertisement: "/path",
    NoOfApplied: "7",
    postedDays: 2,
  },
  {
    vacancyId: 1233,
    title: "Deputy General Manager",
    status: "Open",
    recType: "External Recrutiement",
    closingDate: "2023 sep 20",
    slaryGroup: "HM 1-1",
    boardGrade: "G2",
    advertisement: "/path",
    NoOfApplied: "7",
    postedDays: 2,
  },
];

const VacancyList = () => {
  const [setIsNavBar, setActive] = useOutletContext();
  const [vacancyList, setVacancyList] = useState(vacancies);
  const [searchText, setSearchText] = useState("");
  const theme = useTheme();

  useEffect(() => setIsNavBar(true), [setIsNavBar]);
  useEffect(() => setActive("2"), [setActive]);

  const handleSearch = (vacancies, query) => {
    const filteredVacancies = vacancies.filter((vacancy) =>
      vacancy.title
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(...query.toLowerCase().split(" ")))
    );
    setVacancyList(query.length > 0 ? filteredVacancies : vacancies);
  };

  return (
    <div style={{ backgroundColor: theme.palette.background.main }}>
      <Container component="main" maxWidth="md">
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
              mb: "1rem",
            }}
          >
            Available Opportunities
          </Typography>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "75%",
              backgroundcolor: theme.palette.background.main,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch(vacancies, searchText);
                }
              }}
              placeholder="Search..."
            />
            <IconButton onClick={() => handleSearch(vacancies, searchText)}>
              <Search />
            </IconButton>
          </Paper>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {vacancyList.map((detail, i) => (
            <Vacancy key={i} detail={detail} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default VacancyList;
