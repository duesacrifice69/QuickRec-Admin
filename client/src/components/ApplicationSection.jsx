import {
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DetailCard from "./DetailCard";

const ApplicationSection = ({ title, details, children }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();

  return (
    <Paper sx={{ marginBottom: "4rem" }}>
      <Typography
        sx={{
          p: "0.5rem 0 0 1rem",
          minWidth: "75vw",
          borderBottom: "4px solid " + theme.palette.primary[500],
          fontSize: isMobile ? "1.2rem" : "1.5rem",
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>

      {details &&
        details.map((detail, index) => (
          <DetailCard key={index} detail={detail} />
        ))}

      {!details && (
        <FormControlLabel
          sx={{ display: "flex", justifySelf: "right", m: "1rem 0.3rem" }}
          control={<Checkbox />}
          label="Approve"
          labelPlacement="start"
        />
      )}
    </Paper>
  );
};

export default ApplicationSection;
