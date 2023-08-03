import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const DetailCard = ({ detail }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();

  const getDate = (date) => {
    const fromDate = date.split(" ");
    return `${fromDate[1] ?? ""} ${fromDate[3] ?? ""}`;
  };

  return (
    <Card sx={{ width: "100%", textAlign: "left", mb: "1px" }}>
      <CardHeader
        sx={{ pb: "0" }}
        title={detail.institute ?? detail.title}
        titleTypographyProps={{
          fontSize: isMobile ? "1.2rem" : "1.5rem",
          fontWeight: 600,
        }}
      />
      <CardContent
        sx={{ fontWeight: 550, color: theme.palette.secondary[800] }}
      >
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5}>
            <Typography fontSize={isMobile ? "14px" : "16px"}>
              {detail.qualification ?? detail.organization}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton sx={{ p: 0 }} fontSize={isMobile ? "14px" : "16px"}>
              <DescriptionOutlinedIcon
                sx={{ color: theme.palette.primary[500] }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={5} justifyContent="flex-end">
            <FormControlLabel
              sx={{
                display: "flex",
                justifySelf: "right",
              }}
              control={<Checkbox size="small" />}
              label={
                <Typography
                  fontSize="14px"
                  color={theme.palette.secondary[700]}
                >
                  Approve
                </Typography>
              }
              labelPlacement="start"
            />
          </Grid>
          {detail.startDate && detail.endDate && (
            <Grid item xs={isMobile ? 12 : 5}>
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                From {getDate(detail.startDate)} to {getDate(detail.endDate)}
              </Typography>
            </Grid>
          )}
          <Grid item xs={isMobile ? 12 : 7}>
            <Typography fontSize={isMobile ? "14px" : "16px"}>
              {detail.feild && `Specialized in ${detail.feild}`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
