import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
  IconButton,
  styled,
  CardActions,
  Collapse,
} from "@mui/material";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "./DownloadIcon";
import { useState } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
}));

const DetailCard = ({ detail, handleApprove }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(detail.isApproved);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ width: "100%", textAlign: "left", mb: "1px" }}>
      <CardHeader
        sx={{ pb: "0" }}
        title={detail.instituteName ?? detail.title}
        titleTypographyProps={{
          fontSize: isMobile ? "1rem" : "1.2rem",
          fontWeight: 600,
        }}
      />
      <CardContent
        sx={{
          "&:last-child": { pb: "1rem" },
          fontWeight: 550,
          color: theme.palette.secondary[800],
        }}
      >
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography fontSize={isMobile ? "14px" : "16px"}>
              {detail.qualification ?? detail.organization}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <DownloadIcon fileName={detail.attachmentPath} />
          </Grid>
          <Grid item xs={4} justifyContent="flex-end">
            <FormControlLabel
              sx={{
                display: "flex",
                justifySelf: "right",
              }}
              control={
                <Checkbox
                  size="small"
                  checked={checked}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                    handleApprove(e);
                  }}
                />
              }
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
                From {dayjs(detail.startDate).format("MMM YYYY")} to{"  "}
                {dayjs(detail.endDate).format("MMM YYYY")}
              </Typography>
            </Grid>
          )}
          {detail.fieldOfStudy && (
            <Grid item xs={isMobile ? 12 : 7}>
              <Typography fontSize={isMobile ? "14px" : "16px"}>
                Specialized in {detail.fieldOfStudy}
              </Typography>
            </Grid>
          )}
          {detail.description && (
            <Grid item xs={isMobile ? 12 : 7} justifyContent="flex-end">
              <CardActions
                sx={{
                  p: 0,
                  mr: "-10px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Typography variant="common" color={theme.palette.primary[500]}>
                  see more...
                </Typography>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
            </Grid>
          )}
          {detail.description && (
            <Grid item xs={12}>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography>{detail.description}</Typography>
              </Collapse>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
