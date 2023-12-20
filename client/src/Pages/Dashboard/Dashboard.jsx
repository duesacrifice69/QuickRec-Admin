import {
  Box,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { CountUpCard, TablePagination } from "../../components";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  useGetMasterDataQuery,
  useGetVacancyBySearchQuery,
} from "../../state/api";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const columns = [
  { id: "vacancy", label: "Vacancy", align: "center" },
  { id: "publishedDate", label: "Published Date", align: "center" },
  { id: "closingDate", label: "Closing Date", align: "center" },
  { id: "interviewDate", label: "Interview Date", align: "center" },
  { id: "noOfApplicants", label: "No of Applicants", align: "center" },
  {
    id: "noOfSelectedApplicants",
    label: "Selected Applicants",
    align: "center",
  },
  {
    id: "noOfRejectedApplicants",
    label: "Rejected Applicants",
    align: "center",
  },
  {
    id: "applicationsToReview",
    label: "Applications to Review",
    align: "center",
  },
];
const chartSetting = {
  yAxis: [
    {
      label: "No Of Applicants",
    },
  ],
  height: 350,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
    p: "1rem",
  },
};

const Dashboard = () => {
  const { data: masterData } = useGetMasterDataQuery();
  const { data: vacancies, isLoading: vacanciesIsLoading } =
    useGetVacancyBySearchQuery({
      searchQuery: "",
      vacancyType: "",
      salaryGroup: "",
      boardGrade: "",
    });
  const [setActive] = useOutletContext();
  const theme = useTheme();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows =
    vacancies?.data.filter((vacancy) => vacancy.Status === "Open") ?? [];
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApplicationsView = (VacancyId) => {
    navigate("/applications", { state: { vacancyId: VacancyId } });
  };

  useEffect(() => setActive("1"), [setActive]);

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.main,
        pb: "3rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <CountUpCard
              count={masterData?.data?.dashboardData?.NoOfActiveVacancies}
              title="Total Active Vacancies"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CountUpCard
              count={masterData?.data?.dashboardData?.NoOfPendingApplications}
              title="Applications to Review"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CountUpCard
              count={masterData?.data?.dashboardData?.NoOfPendingVacancies}
              title="Vacancies to Approve"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CountUpCard count={25} title="Applications to Review" />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper>
              <BarChart
                dataset={
                  masterData?.data.chartData ?? [
                    {
                      month: "",
                      selected: 0,
                      rejected: 0,
                    },
                  ]
                }
                xAxis={[{ scaleType: "band", dataKey: "month" }]}
                series={[
                  { dataKey: "selected", label: "Selected", color: "#4880B4" },
                  { dataKey: "rejected", label: "Rejected", color: "#290F87" },
                ]}
                {...chartSetting}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{
                height: 350,
                p: "1rem 0.5rem",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  color: (theme) => theme.palette.primary[500],
                  fontSize: "1.25rem",
                  fontWeight: 500,
                }}
              >
                Upcoming Interviews
              </Typography>
              <List
                sx={{
                  pl: 4,
                  listStyle: "square",
                  overflowY: "scroll",
                  height: 288,
                  "&::-webkit-scrollbar": {
                    width: "3px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: (theme) => theme.palette.secondary.main,
                    borderRadius: "10px",
                  },
                }}
              >
                {masterData?.data.upcomingInterviews.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{ display: "list-item", pl: "0.5rem", fontWeight: 550 }}
                  >
                    {item.VacancyName}
                    <Typography sx={{ fontSize: "0.9rem" }}>
                      {dayjs(item.PlannedInterViewDate).format("DD/MM/YYYY")}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Paper sx={{ p: { sm: "2rem", xs: "2rem 1rem" }, m: "2rem auto" }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.primary[500],
              fontSize: "1.5rem",
              fontWeight: 500,
              mb: "2rem",
            }}
          >
            All Active Vacancies
          </Typography>
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
              </TableRow>
            </TableHead>
            {vacanciesIsLoading ? (
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
                      key={row.VacancyId}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleApplicationsView(row.VacancyId)}
                    >
                      <TableCell align="left">{row.VacancyName}</TableCell>
                      <TableCell align="center">
                        {dayjs(row.PublishedDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="center">
                        {dayjs(row.ClosingDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="center">
                        {dayjs(row.PlannedInterViewDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="center">{row.NoOfApplicants}</TableCell>
                      <TableCell align="center">
                        {row.NoOfSelectedApplicants}
                      </TableCell>
                      <TableCell align="center">
                        {row.NoOfRejectedApplicants}
                      </TableCell>
                      <TableCell align="center">
                        {row.NoOfPendingApplicants}
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
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
