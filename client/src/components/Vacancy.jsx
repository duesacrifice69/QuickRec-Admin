import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "./DownloadIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import dayjs from "dayjs";
import { VacancyStatus } from "../constant/data";

const Vacancy = ({ vacancy, onDelete, onEdit, editable }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={vacancy.VacancyName}
        subheader={`Posted ${vacancy.DaysPosted}`}
        sx={{
          backgroundColor: (theme) => theme.palette.secondary[200],
          p: "12px",
        }}
        titleTypographyProps={{
          fontSize: (isMobile) => (isMobile ? "1.2rem" : "1.5rem"),
          fontWeight: 600,
        }}
        subheaderTypographyProps={{
          fontSize: (isMobile) => (isMobile ? "0.8rem" : "1rem"),
        }}
        action={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50px",
              minWidth: "70px",
              mr: "10px",
            }}
          >
            <Chip
              label={VacancyStatus[vacancy.Status]}
              variant="filled"
              color={
                vacancy.Status === "APPROVED"
                  ? "primary"
                  : vacancy.Status === "CLOSED"
                  ? "error"
                  : vacancy.Status === "PENDING"
                  ? "warning"
                  : "success"
              }
              sx={{
                fontWeight: 500,
                width: "max-content",
              }}
            />
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 400,
              }}
            >
              {vacancy.DaysLeft}
            </Typography>
          </Box>
        }
      />
      <CardContent sx={{ "&:last-child": { pb: "10px" } }}>
        <Typography
          fontSize={isMobile ? "14px" : "16px"}
          sx={{
            fontWeight: 575,
            mb: "10px",
            color: (theme) => theme.palette.secondary[800],
          }}
        >
          {vacancy.RecruitmentType}
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={isMobile ? 12 : 4}>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                Closing date:{" "}
              </Typography>
              <Typography
                fontSize={isMobile ? "14px" : "16px"}
                sx={{
                  fontWeight: 550,
                  color: (theme) => theme.palette.secondary[700],
                }}
              >
                {dayjs(vacancy.ClosingDate).format("DD/MM/YYYY")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={isMobile ? 12 : 8}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                Published date:{" "}
              </Typography>
              <Typography
                fontSize={isMobile ? "14px" : "16px"}
                sx={{
                  fontWeight: 550,
                  color: (theme) => theme.palette.secondary[700],
                }}
              >
                {dayjs(vacancy.PublishedDate).format("DD/MM/YYYY")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={isMobile ? 12 : 4}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                Salary Group:{" "}
              </Typography>
              <Typography
                fontSize={isMobile ? "14px" : "16px"}
                sx={{
                  fontWeight: 550,
                  color: (theme) => theme.palette.secondary[700],
                }}
              >
                {vacancy.SalaryGroup}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={isMobile ? 12 : 4}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                Board Grade:{" "}
              </Typography>
              <Typography
                fontSize={isMobile ? "14px" : "16px"}
                sx={{
                  fontWeight: 550,
                  color: (theme) => theme.palette.secondary[700],
                }}
              >
                {vacancy.BoardGrade}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={isMobile ? 12 : 4}>
            <Box
              sx={{
                display: "flex",
                mt: "-8px",
                alignItems: "center",
              }}
            >
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                Advertisement:{" "}
              </Typography>
              <DownloadIcon fileName={vacancy.AdvertismentPath} />
            </Box>
          </Grid>
        </Grid>
        <hr
          style={{
            border: "none",
            height: "2px",
            backgroundColor: theme.palette.secondary[300],
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <VisibilityIcon sx={{ fontSize: "24px" }} />
            <Typography fontSize={isMobile ? "14px" : "16px"}>
              Applied ({vacancy.NoOfApplicants})
            </Typography>
          </Box>
          {editable ? (
            <Box sx={{ ml: "auto" }}>
              <IconButton
                sx={{ color: (theme) => theme.palette.secondary[900] }}
                onClick={onDelete}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                sx={{ color: (theme) => theme.palette.secondary[900] }}
                onClick={onEdit}
              >
                <EditNoteIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ height: "40px" }} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Vacancy;
