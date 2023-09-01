import {
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Element } from "react-scroll";
import DetailCard from "./DetailCard";
import { useState } from "react";

const ApplicationSection = ({
  title,
  details,
  children,
  isApproved,
  handleApprove,
  sx,
}) => {
  const [checked, setChecked] = useState(isApproved);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();

  return (
    <Element name={title}>
      <Paper sx={sx || { mb: "4rem", mt: "0.5rem" }}>
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
            <DetailCard
              key={index}
              detail={detail}
              handleApprove={(e) =>
                handleApprove(
                  e,
                  detail?.eduDetailsId ??
                    detail?.expDetailId ??
                    detail?.achvDetailId
                )
              }
            />
          ))}

        {!details && (
          <FormControlLabel
            sx={{
              display: "flex",
              justifySelf: "right",
              mr: "5px",
              mb: "10px",
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
              <Typography fontSize="14px" color={theme.palette.secondary[700]}>
                Approve
              </Typography>
            }
            labelPlacement="start"
          />
        )}
      </Paper>
    </Element>
  );
};

export default ApplicationSection;
