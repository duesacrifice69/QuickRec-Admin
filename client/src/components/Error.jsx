import { Fade, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Error = ({ error, setError }) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (error !== null && error !== undefined) {
      setFadeIn(true);
      setTimeout(() => setFadeIn(false), 5000);
      setTimeout(() => setError(null), 5500);
    }
  }, [error, setError]);

  return (
    <Fade in={fadeIn}>
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
