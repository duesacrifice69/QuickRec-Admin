import { useTheme } from "@emotion/react";
import { ListItem, ListItemButton } from "@mui/material";

const ListItemStyle = ({ index, active, onClick, children }) => {
  const theme = useTheme();
  return (
    <ListItem role="none">
      <ListItemButton
        onClick={onClick}
        sx={{
          textDecoration: "none",
          width: "max-content",
          height: "50px",
          boxSizing: "border-box",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "20px",
          "&:hover": {
            transition: "0.5s all ease-in-out",
            bakcground: "none",
            borderBottom: `5px solid #ffffff`,
          },
          borderBottom: `5px solid ${
            active === index ? "#ffffff" : theme.palette.primary[500]
          }`,
        }}
      >
        {children}
      </ListItemButton>
    </ListItem>
  );
};

export default ListItemStyle;
