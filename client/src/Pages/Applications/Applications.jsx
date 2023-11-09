import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  IconButton,
  TableHead,
  Grid,
  Typography,
  useMediaQuery,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Input from "../../components/Input";
import {
  useGetApplicationsByVacancyQuery,
  useGetVacancyBySearchQuery,
} from "../../state/api";
import TablePagination from "../../components/TablePagination";

const columns = [
  { id: "fullName", label: "Full Name", align: "center" },
  { id: "vacancy", label: "Vacancy", align: "center" },
  { id: "phoneNo", label: "Phone No", align: "center" },
  { id: "date", label: "Date", align: "center" },
  { id: "status", label: "Status", align: "center", filter: true },
];

const statusList = ["All", "Selected", "Rejected", "Pending"];

const Applications = () => {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("ALL");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [vacancyId, setVacancyId] = useState(undefined);
  const [vacancy, setVacancy] = useState(null);
  const location = useLocation();
  const [setActive] = useOutletContext();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: allApplications, isLoading: applicationsIsLoading } =
    useGetApplicationsByVacancyQuery(vacancyId);
  const { data: vacancies, isLoading: vacanciesIsLoading } =
    useGetVacancyBySearchQuery({
      searchQuery: "",
      vacancyType: "",
      salaryGroup: "",
      boardGrade: "",
    });

  useEffect(() => setActive("3"), [setActive]);

  useEffect(() => {
    setVacancyId(location?.state?.vacancyId);
  }, [location?.state?.vacancyId]);

  useEffect(() => {
    !vacanciesIsLoading &&
      setVacancy(
        vacancies.data.find(({ VacancyId }) => VacancyId === vacancyId)
      );
  }, [vacancyId, vacancies?.data, vacanciesIsLoading]);

  const allRows = allApplications?.data ?? [];
  const rows =
    status === "ALL" ? allRows : allRows.filter((row) => row.Status === status);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApplicationView = (userId, applicationId) => {
    navigate("/application", {
      state: {
        userId,
        applicationId,
        vacancyId,
      },
    });
  };

  const handleFilterOpen = () => {
    setOpen(true);
  };
  const handleFilterClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.main, pb: "3rem" }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: "3rem 3vw" }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={isMobile ? 3 : 2}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Vacancy:
              </Typography>
            </Grid>
            <Grid item xs={isMobile ? 9 : 10}>
              <Input
                name="vacancy"
                type="select"
                value={vacancyId}
                handleChange={(e) => setVacancyId(e.target.value)}
                options={vacancies?.data.map(({ VacancyName, VacancyId }) => ({
                  value: VacancyId,
                  text: VacancyName,
                }))}
                loading={vacanciesIsLoading}
                autocomplete
              />
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                rowSpacing={2}
                sx={{
                  m: "2rem auto",
                  backgroundColor: theme.palette.background.main,
                  borderRadius: "10px",
                  p: "1rem 3vw",
                }}
              >
                {vacancy && (
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        pb: "1rem",
                        borderBottom: "1px solid " + theme.palette.primary[500],
                      }}
                    >
                      <span style={{ color: theme.palette.primary[500] }}>
                        {vacancy?.VacancyName}
                      </span>
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={isMobile ? 10.5 : 4}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Total No. of Applicants :
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    {vacancy?.NoOfApplicants}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 0 : 1} />
                <Grid item xs={isMobile ? 10.5 : 4.5}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Total No. of Approved for Interviews :
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 1.5 : 1}>
                  <Typography
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    {vacancy?.NoOfSelectedApplicants}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 9.5 : 4}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Closing Date of Application :
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 2.5 : 1.5}>
                  <Typography
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    {vacancy?.ClosingDate
                      ? dayjs(vacancy?.ClosingDate).format("DD/MM/YYYY")
                      : null}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 0 : 1} />
                <Grid item xs={isMobile ? 10.5 : 4}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Total No. of Rejected :
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Typography
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    {vacancy?.NoOfRejectedApplicants}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 9.5 : 4}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Expected Date of Interview :
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 2.5 : 1.5}>
                  <Typography
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    {vacancy?.PlannedInterViewDate
                      ? dayjs(vacancy?.PlannedInterViewDate).format(
                          "DD/MM/YYYY"
                        )
                      : null}
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 0 : 1} />
                <Grid item xs={isMobile ? 10.5 : 4.5}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Total No. of Pending to be Reviewed :
                  </Typography>
                </Grid>
                <Grid item xs={isMobile ? 1.5 : 1}>
                  <Typography
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    {vacancy?.NoOfPendingApplicants}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* ---------- Applicants Table ---------- */}
            <Grid item xs={12}>
              <Table
                sx={{
                  display: { xs: "block", sm: "table" },
                  overflowX: "scroll",
                  backgroundColor: theme.palette.background.main,
                  border: "1px solid " + theme.palette.secondary[200],
                  borderRadius: "3px",
                  th: {
                    backgroundColor: theme.palette.secondary[200],
                  },
                }}
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: "max-content" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell
                      style={{
                        width: "min-content",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <IconButton
                        onClick={handleFilterOpen}
                        sx={{ marginLeft: "-40px" }}
                      >
                        <FilterAltIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {applicationsIsLoading ? (
                  <TableBody>
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={columns.length}>
                        <div style={{ width: "min-content", margin: "auto" }}>
                          <CircularProgress size="5rem" />
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? rows.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : rows
                      ).map((row) => (
                        <TableRow
                          hover
                          key={row.ApplicationId}
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            handleApplicationView(row.UserId, row.ApplicationId)
                          }
                        >
                          <TableCell align="left">
                            {row.NameWithInitials}
                          </TableCell>
                          <TableCell align="center">
                            {row.VacancyName}
                          </TableCell>
                          <TableCell align="center">{row.MobileNo1}</TableCell>
                          <TableCell align="center">
                            {dayjs(row.AppliedDate).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              sx={{
                                backgroundColor:
                                  row.Status === "REJECTED"
                                    ? "#e57373"
                                    : row.Status === "SELECTED"
                                    ? "#81c784"
                                    : "#f7cb73",
                              }}
                              label={
                                row.Status.charAt(0) +
                                row.Status.slice(1).toLowerCase()
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={columns.length} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TablePagination
                      rows={rows.length}
                      columns={columns.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </>
                )}
              </Table>
            </Grid>
          </Grid>

          <Dialog onClose={handleFilterClose} open={open}>
            <DialogTitle>Filter: Application Status</DialogTitle>
            <List
              sx={{
                "& li>div": {
                  borderBottom: (theme) =>
                    "1px solid " + theme.palette.secondary[600],
                },
                "& li:last-child>div": {
                  borderBottom: "none",
                },
              }}
            >
              {statusList.map((status, i) => (
                <ListItem key={i} sx={{ pt: 0, pb: 0 }}>
                  <ListItemButton
                    onClick={() => {
                      setStatus(status.toUpperCase());
                      handleFilterClose();
                    }}
                  >
                    <ListItemText primary={status} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Dialog>
        </Paper>
      </Container>
    </Box>
  );
};

export default Applications;
