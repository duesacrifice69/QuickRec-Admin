import { Fade, Grid, Typography } from "@mui/material";
import { useEffect } from "react";

const Error = ({ error, setError }) => {
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error, setError]);
  return (
    <Fade in={error}>
      <Grid item xs={12}>
        <Typography
          sx={{
            fontSize: "0.8rem",
            m: "auto",
            p: "1rem",
            color: "#ff0000",
            border: "1px solid #ff0000",
            borderRadius: "5px",
          }}
        >
          {error}
        </Typography>
      </Grid>
    </Fade>
  );
};

export default Error;
