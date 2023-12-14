import { Box, Button, LinearProgress } from "@mui/material";

const ButtonComp = ({ loading, ...props }) => (
  <Box textAlign={props.align}>
    <Button
      variant="contained"
      {...props}
      disabled={loading || props.disabled}
      sx={{
        overflow: "hidden",
        position: "relative",
        color: (theme) =>
          theme.palette.getContrastText(theme.palette.primary[500]),
        backgroundColor: (theme) => theme.palette.primary[500],
        "&:hover": {
          backgroundColor: (theme) => theme.palette.primary[400],
        },
        display: "inline-flex",
        ...props.sx,
      }}
    >
      <Box component="span">{props.children}</Box>
      {loading && (
        <LinearProgress
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        />
      )}
    </Button>
  </Box>
);

export default ButtonComp;
