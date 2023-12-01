import { KeyboardArrowDown } from "@mui/icons-material";
import { Fade, ListItem, ListItemButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const ListItemStyle = ({
  index,
  icon,
  active,
  sx,
  onClick,
  subMenu,
  children,
}) => {
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
        p: { xs: 0, md: "8px 16px" },
        ...sx,
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
          color: "#ffffff",
          backgroundColor: (theme) =>
            active === index ? theme.palette.primary[600] : "initial",
          fontWeight: { sm: 600, xs: 400 },
          fontSize: { md: "1.25rem", sm: "1rem" },
          "&:hover": {
            transition: "0.5s all ease-in-out",
            bakcground: "none",
          },
        }}
      >
        {icon}&nbsp;&nbsp;
        {children}
        {subMenu && (
          <>
            &nbsp;
            <KeyboardArrowDown
              sx={{
                display: { sm: "initial", xs: "none" },
                fontSize: { md: "1.25rem", sm: "1rem" },
              }}
            />
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
                  {item.icon}&nbsp;&nbsp;
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default ListItemStyle;
