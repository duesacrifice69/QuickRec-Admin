import { styled } from "@mui/material/styles";
import { ListItemButton } from "@mui/material";

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  textDecoration: "none",
  height: "50px",
  boxSizing: "border-box",
  color: theme.palette.secondary[900],
  fontWeight: 600,
  fontSize: "20px",
  "&:hover": {
    transition: "0.5s all ease-in-out",
    bakcground: "none",
    borderBottom: `5px solid ${theme.palette.primary[500]}`,
  },
}));

export default ListItemStyle;
