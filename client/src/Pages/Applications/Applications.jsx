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
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

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

function createData(id, name, vacancy, phone, date) {
  return { id, name, vacancy, phone, date };
}
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
const rows = [
  createData(
    69,
    "R.W.C.T.Rajapaksha",
    "Deputy General Manager",
    "+94714567893",
    "2022-02-05"
  ),
  createData(123, "R.W.C.T.Rajapaksha", "TEsT", 9999999, "2022-02-05"),
  createData(222, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(223, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(224, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(225, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(226, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(227, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(228, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(229, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(210, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(211, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(212, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(213, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(214, "TEst", "TEsT", 9999999, "2022-02-05"),
  createData(215, "TEst", "TEsT", 9999999, "2022-02-05"),
].sort((a, b) => (a.id < b.id ? -1 : 1));

const Applications = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [setIsNavbar, setActive] = useOutletContext();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => setIsNavbar(true), [setIsNavbar]);
  useEffect(() => setActive("1"), [setActive]);

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

  return (
    <Box sx={{ backgroundColor: theme.palette.background.main, pb: "5rem" }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: "3vh 3vw" }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 0, sm: 2, md: 3 }}
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
                  <MenuItem value={1}>1</MenuItem>
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
                }}
              >
                <Grid item xs={2}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}
                  >
                    Total No. of Applicants:
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <FormControl size="small">
                    <Select
                      name="noofApplicants:"
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
                      <MenuItem value={1}>1</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>{" "}
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
