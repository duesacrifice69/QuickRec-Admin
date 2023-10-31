import { KeyboardArrowDown } from "@mui/icons-material";
import { Fade, ListItem, ListItemButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const ListItemStyle = ({ index, icon, active, onClick, subMenu, children }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <ListItem
      role="none"
      sx={{
        width: "max-content",
      }}
    >
      <ListItemButton
        onClick={(e) => {
          subMenu ? handleMenuClick(e) : onClick(e);
        }}
        sx={{
          textDecoration: "none",
          position: "relative",
          height: "50px",
          boxSizing: "border-box",
          color: (theme) =>
            active === index ? theme.palette.primary[100] : "#ffffff",
          fontWeight: { sm: 600, xs: 400 },
          fontSize: { sm: "1.25rem", xs: "1rem" },
          "&:hover": {
            transition: "0.5s all ease-in-out",
            bakcground: "none",
          },
        }}
      >
        {icon}
        {icon && <div style={{ width: "0.5rem" }}></div>}
        {children}
        {subMenu && <KeyboardArrowDown fontSize="20px" sx={{ ml: "0.5rem" }} />}
        {subMenu && (
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
          >
            {subMenu.map((item, i) => (
              <MenuItem
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setAnchorEl(null);
                  item.onClick(e);
                }}
              >
                {item?.icon}
                {item?.icon && <div style={{ width: "0.5rem" }}></div>}
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default ListItemStyle;
