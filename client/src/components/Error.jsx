import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";

const Error = ({ error, setError }) => {
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error, setError]);
  return (
    <Grid item xs={12}>
      <Typography
        sx={{
          display: !error && "none",
          fontSize: "0.8rem",
          m: "1rem auto",
          p: "1rem",
          color: "#ff0000",
          border: "1px solid #ff0000",
          borderRadius: "5px",
        }}
      >
        {error?.message}
      </Typography>
    </Grid>
  );
};

export default Error;
