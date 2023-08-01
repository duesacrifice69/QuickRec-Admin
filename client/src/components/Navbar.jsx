import { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  useTheme,
  List,
  Box,
  IconButton,
  ListItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListItemStyle from "./ListItemStyle";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../state/Auth";
import { useDispatch } from "react-redux";
import { isTokenExpired } from "../functions";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const Navbar = ({ active, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userContext.data);

  useEffect(() => {
    if (!user?.result) {
      navigate("/");
    } else if (isTokenExpired()) {
      dispatch(logOut());
    }
  });

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(logOut());
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (e, navigateTo) => {
    e.stopPropagation();
    setAnchorEl(null);
    navigateTo && navigate(navigateTo);
  };
  return (
    <div style={{ backgroundColor: theme.palette.background.main }}>
      <AppBar
        sx={{
          position: "static",
          boxShadow: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: isNonMobile ? "flex-end" : "flex-start",
          maxHeight: isNonMobile ? "50px" : "40px",
          width: "100%",
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Toolbar
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          {!isNonMobile ? (
            <Box>
              <IconButton
                onClick={() => {
                  setIsSidebarOpen(!isSidebarOpen);
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          ) : (
            <Box component="nav">
              <List sx={{ display: "flex" }}>
                <ListItem role="none">
                  <ListItemStyle
                    key="1"
                    onClick={() => {
                      navigate("/home");
                    }}
                    sx={{
                      borderBottom: `5px solid ${
                        active === "1"
                          ? theme.palette.primary[500]
                          : theme.palette.secondary.main
                      }`,
                    }}
                  >
                    Home
                  </ListItemStyle>
                </ListItem>

                <ListItem role="none">
                  <ListItemStyle
                    key="2"
                    onClick={() => {}}
                    sx={{
                      padding: 0,
                      borderBottom: `5px solid ${
                        active === "2"
                          ? theme.palette.primary[500]
                          : theme.palette.secondary.main
                      }`,
                    }}
                  >
                    <Button
                      id="fade-button"
                      aria-controls={open ? "fade-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleMenuClick}
                      sx={{
                        padding: "0 16px 0 16px",
                        color: "inherit",
                        fontFamily: "inherit",
                        textTransform: "inherit",
                        fontSize: "inherit",
                        fontWeight: "inherit",
                      }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      Vacancy
                    </Button>
                    <Menu
                      id="fade-menu"
                      disableScrollLock={true}
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={(e) => handleMenuItemClick(e)}
                      TransitionComponent={Fade}
                    >
                      <MenuItem
                        onClick={(e) => handleMenuItemClick(e, "/postVacancy")}
                      >
                        Post Vacancy
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => handleMenuItemClick(e, "/vacancies")}
                      >
                        All Vacancies
                      </MenuItem>
                    </Menu>
                  </ListItemStyle>
                </ListItem>

                <ListItem role="none">
                  <ListItemStyle
                    key="3"
                    onClick={() => {}}
                    sx={{
                      borderBottom: `5px solid ${
                        active === "3"
                          ? theme.palette.primary[500]
                          : theme.palette.secondary.main
                      }`,
                    }}
                  >
                    Profile
                  </ListItemStyle>
                </ListItem>

                <ListItem role="none">
                  <ListItemStyle
                    key="4"
                    onClick={() => handleLogOut()}
                    sx={{
                      borderBottom: `5px solid ${
                        active === "4"
                          ? theme.palette.primary[500]
                          : theme.palette.secondary.main
                      }`,
                      width: "120px",
                    }}
                  >
                    Log out
                  </ListItemStyle>
                </ListItem>
              </List>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <div
        style={{
          margin: "10px 20px 0 20px",
        }}
      >
        <Typography>Welcome {user?.result?.UserName} !</Typography>
      </div>
    </div>
  );
};

export default Navbar;
