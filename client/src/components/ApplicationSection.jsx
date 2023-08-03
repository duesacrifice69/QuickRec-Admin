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
          p: "1rem 1.5rem 0.5rem",
          borderBottom: "4px solid " + theme.palette.primary[500],
          fontSize: isMobile ? "1.4rem" : "1.8rem",
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      {children}
      {details &&
        details.map((detail, index) => (
          <DetailCard key={index} detail={detail} />
        ))}

      {!details && (
        <FormControlLabel
          sx={{
            display: "flex",
            justifySelf: "right",
            mr: "5px",
            mb: "10px",
          }}
          control={<Checkbox size="small" />}
          label={
            <Typography fontSize="14px" color={theme.palette.secondary[700]}>
              Approve
            </Typography>
          }
          labelPlacement="start"
        />
      )}
    </Paper>
  );
};

export default ApplicationSection;