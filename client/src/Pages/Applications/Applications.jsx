import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableHead,
  Grid,
  FormControl,
  Typography,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
const applications = require("../Application/sampleData.json");

let applicationsArray = [];
for (let application in applications) {
  applicationsArray.push({
    id: application,
    name: applications[application].sampleDetails.basicDetails.nameWithInitials,
    vacancy: applications[application].state.vacancy,
    phone: applications[application].sampleDetails.basicDetails.mobileNo1,
    date: "2022-02-22",
  });
}

const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const columns = [
  {
    id: "applicationId",
    label: "Application ID",
    align: "center",
    minWidth: 50,
  },
  { id: "fullName", label: "Full Name", align: "center", minWidth: 100 },
  { id: "vacancy", label: "Vacancy", align: "center", minWidth: 100 },
  { id: "phoneNo", label: "Phone No", align: "center", minWidth: 100 },
  { id: "date", label: "Date", align: "center", minWidth: 110 },
];
const allRows = applicationsArray.sort((a, b) =>
  Number(a.id) < Number(b.id) ? -1 : 1
);

const Applications = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [vacancy, setVacancy] = useState("Any");
  const [setIsNavbar, setActive] = useOutletContext();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => setIsNavbar(true), [setIsNavbar]);
  useEffect(() => setActive("1"), [setActive]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const rows =
    vacancy !== "Any"
      ? allRows.filter((application) => application.vacancy === vacancy)
      : allRows;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
            <Grid item xs={2}>
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
                Vacancy:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl size="small">
                <Select
                  name="vacancy"
                  value={vacancy}
                  onChange={(e) => setVacancy(e.target.value)}
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
                  <MenuItem value="Any">Any</MenuItem>
                  <MenuItem value="Deputy General Manager">
                    Deputy General Manager
                  </MenuItem>
                  <MenuItem value="TEsT">TEsT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                rowSpacing={2}
                sx={{
                  m: "2rem auto",
                  backgroundColor: theme.palette.secondary[100],
                  borderRadius: "10px",
                  p: "1rem 3vw",
                }}
              >
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
                    {rows.length}
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
                    {rows.length}
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
                    2022-02-02
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
                    {rows.length}
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
                    2022-02-22
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
                    {rows.length}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Table
            sx={{
              minWidth: 500,
              backgroundColor: theme.palette.secondary[100],
              border: "1px solid " + theme.palette.secondary[500],
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
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
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
                  key={row.id}
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("/applications/" + row.id)}
                >
                  <TableCell style={{ width: 50 }} align="center">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 260 }} align="left">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="left">
                    {row.vacancy}
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="center">
                    {row.phone}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.date}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={columns.length}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
};

export default Applications;
