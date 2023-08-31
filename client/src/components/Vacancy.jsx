import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "./DownloadIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import dayjs from "dayjs";

const Vacancy = ({ vacancy, onDelete, onEdit }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={vacancy.VacancyName}
        subheader={`Posted ${vacancy.DaysPosted}`}
        sx={{
          backgroundColor: (theme) => theme.palette.secondary[400],
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
          <Typography
            fontSize={isMobile ? "14px" : "16px"}
            sx={{
              lineHeight: "3.3",
              pr: "10px",
              color: (theme) => theme.palette.secondary[800],
            }}
          >
            {vacancy.Status}
          </Typography>
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
            <div
              style={{
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
                {dayjs(vacancy.ClosingDate).format("YYYY-MM-DD")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={isMobile ? 12 : 8}>
            <div style={{ display: "flex", gap: "10px" }}>
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
                {dayjs(vacancy.PublishedDate).format("YYYY-MM-DD")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={isMobile ? 12 : 4}>
            <div style={{ display: "flex", gap: "10px" }}>
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
            </div>
          </Grid>
          <Grid item xs={isMobile ? 12 : 4}>
            <div style={{ display: "flex", gap: "10px" }}>
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
            </div>
          </Grid>
          <Grid item xs={isMobile ? 12 : 4}>
            <div
              style={{
                display: "flex",
                marginTop: "-8px",
                alignItems: "center",
              }}
            >
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                Advertisement:{" "}
              </Typography>
              <DownloadIcon fileName={vacancy.AdvertismentPath} />
            </div>
          </Grid>
        </Grid>
        <hr
          style={{
            border: "none",
            height: "2px",
            backgroundColor: theme.palette.secondary[300],
          }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <VisibilityIcon sx={{ fontSize: "24px" }} />
            <Typography fontSize={isMobile ? "14px" : "16px"}>
              Applied ({vacancy.NoOfApplicants})
            </Typography>
          </div>
          <div style={{ marginLeft: "auto" }}>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Vacancy;
