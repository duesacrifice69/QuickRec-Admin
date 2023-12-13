import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";

const ButtonComp = (props) => {
  return (
    <Box textAlign={props.align}>
      <LoadingButton
        variant="contained"
        {...props}
        loadingPosition="end"
        sx={{
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.primary[500]),
          backgroundColor: (theme) => theme.palette.primary[500],
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary[400],
          },
          ...props.sx,
        }}
      >
        <Box
          component="span"
          sx={
            !props.fullWidth &&
            props.loading !== undefined &&
            (props.loading ? { pr: "1rem" } : { px: "0.5rem" })
          }
        >
          {props.children}
        </Box>
      </LoadingButton>
    </Box>
  );
};
export default ButtonComp;
