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
import PostVacancy from "../PostVacancy/PostVacany";
import * as api from "../../api";
let vacancies;

const VacancyList = () => {
  const [vacancyList, setVacancyList] = useState([]);
  const [setActive] = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [vacancyId, setVacancyId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const theme = useTheme();

  useEffect(() => setActive("2"), [setActive]);

  useEffect(() => {
    api.vacancies().then((res) => {
      vacancies = res.data;
      setVacancyList(res.data);
    });
  }, []);

  const handleSearch = (query) => {
    const filteredVacancies = vacancyList.filter((vacancy) =>
      vacancy.VacancyName.toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(...query.toLowerCase().split(" ")))
    );
    setVacancyList(query.length > 0 ? filteredVacancies : vacancies);
  };

  const handelDelete = (detail) => {
    setVacancyList(vacancyList.filter((vacancy) => vacancy !== detail));
  };

  const handleEdit = (detail) => {
    setIsEditing(true);
    setVacancyId(detail.vacancyId);
  };

  return !isEditing ? (
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
                  handleSearch(searchText);
                }
              }}
              placeholder="Search..."
            />
            <IconButton onClick={() => handleSearch(searchText)}>
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
          {vacancyList.map((detail) => (
            <Vacancy
              key={detail.VacancyId}
              detail={detail}
              onDelete={() => handelDelete(detail)}
              onEdit={() => handleEdit(detail)}
            />
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <PostVacancy
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      vacancyId={vacancyId}
    />
  );
};

export default VacancyList;
