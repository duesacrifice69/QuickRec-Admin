import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const ButtonComp = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.primary[500]),
  // p: { xs: "0.6rem", sm: "1rem" },
  backgroundColor: theme.palette.primary[500],
  "&:hover": {
    backgroundColor: theme.palette.primary[400],
  },
}));

export default ButtonComp;
