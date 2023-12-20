import {
  Paper,
  Container,
  Typography,
  InputBase,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Vacancy } from "../../components";
import PostVacancy from "../PostVacancy/PostVacany";
import { useGetVacancyBySearchQuery } from "../../state/api";

const VacancyList = () => {
  const [setActive] = useOutletContext();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // const [deleteVacancy, setDeleteVacancy] = useState();
  const [editingVacancy, setEditingVacancy] = useState({});
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const { data: searchVacancyList, isFetching: vacancySearchLoading } =
    useGetVacancyBySearchQuery({
      searchQuery: search,
      vacancyType: "",
      salaryGroup: "",
      boardGrade: "",
    });

  useEffect(() => setActive("2"), [setActive]);

  const handleSearch = () => {
    setSearch(searchText);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearch(searchText);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setOpen(false);
    // await api.deleteVacancy(deleteVacancy);
  };

  const handleDeleteButton = (vacancyId) => {
    setOpen(true);
    // setDeleteVacancy(vacancyId);
  };

  const handleEdit = (vacancy) => {
    setIsEditing(true);
    setEditingVacancy(vacancy);
  };

  return !isEditing ? (
    <div
      style={{
        backgroundColor: theme.palette.background.main,
        minHeight: "calc(100vh - 164px)",
        paddingBottom: "20px",
      }}
    >
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search..."
            />
            <IconButton onClick={handleSearch}>
              <Search />
            </IconButton>
          </Paper>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete this Vacancy ?</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
            <Button onClick={handleDelete} sx={{ color: "red" }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {searchVacancyList && !vacancySearchLoading ? (
            searchVacancyList.data.length > 0 ? (
              searchVacancyList.data.map((vacancy) => {
                return (
                  <Vacancy
                    key={vacancy.VacancyId}
                    vacancy={vacancy}
                    onDelete={() => handleDeleteButton(vacancy.VacancyId)}
                    onEdit={() => handleEdit(vacancy)}
                  />
                );
              })
            ) : (
              <div
                style={{
                  width: "max-content",
                  height: "200px",
                  margin: "auto",
                }}
              >
                No Results ...
              </div>
            )
          ) : (
            <div style={{ width: "min-content", margin: "auto" }}>
              <CircularProgress size="5rem" />
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : (
    <PostVacancy
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      editingVacancy={editingVacancy}
    />
  );
};

export default VacancyList;
