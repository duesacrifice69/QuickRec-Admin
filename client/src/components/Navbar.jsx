import {
  AppBar,
  Toolbar,
  useTheme,
  List,
  Box,
  IconButton,
  ListItem,
  Typography,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListItemStyle from "./ListItemStyle";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../state/Auth";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { isTokenExpired } from "../utils/getDataFromToken";

const Navbar = ({
  active,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  window,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.userContext.data);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    if (isTokenExpired()) {
      dispatch(logOut());
    }
  });

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(logOut());
  };
  const handleMenuClick = (event) => {
    isNonMobile ? setAnchorEl(event.currentTarget) : setAnchorEl(!anchorEl);
  };
  const handleClick = (e, navigateTo) => {
    e.stopPropagation();
    isNonMobile ? setAnchorEl(null) : setAnchorEl(false);
    !isNonMobile && setIsSidebarOpen(false);
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
              <Drawer
                container={container}
                variant="temporary"
                open={isSidebarOpen}
                onClose={() => {
                  setAnchorEl(false);
                  setIsSidebarOpen(!isSidebarOpen);
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              >
                <ListItem role="none">
                  <ListItemStyle
                    key="1"
                    onClick={(e) => handleClick(e, "/home")}
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    Home
                  </ListItemStyle>
                </ListItem>

                <ListItem role="none">
                  <ListItemStyle
                    key="2"
                    onClick={handleMenuClick}
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    Vacancy
                    <KeyboardArrowDownIcon sx={{ pl: "5px" }} />
                  </ListItemStyle>
                </ListItem>
                {anchorEl && (
                  <span
                    style={{ backgroundColor: theme.palette.secondary[400] }}
                  >
                    <ListItem role="none">
                      <ListItemStyle
                        key="3"
                        onClick={(e) => handleClick(e, "/postVacancy")}
                        sx={{
                          fontSize: "14px",
                          fontWeight: 400,
                        }}
                      >
                        Post Vacancy
                      </ListItemStyle>
                    </ListItem>
                    <ListItem role="none">
                      <ListItemStyle
                        key="4"
                        onClick={(e) => handleClick(e, "/vacancies")}
                        sx={{
                          fontSize: "14px",
                          fontWeight: 400,
                        }}
                      >
                        All Vacancies
                      </ListItemStyle>
                    </ListItem>
                  </span>
                )}

                <ListItem role="none">
                  <ListItemStyle
                    key="5"
                    onClick={handleClick}
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    Profile
                  </ListItemStyle>
                </ListItem>

                <ListItem role="none">
                  <ListItemStyle
                    key="6"
                    onClick={handleLogOut}
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      width: "max-content",
                    }}
                  >
                    Log out
                  </ListItemStyle>
                </ListItem>
              </Drawer>
            </Box>
          ) : (
            <Box component="nav">
              <List sx={{ display: "flex" }}>
                <ListItem role="none">
                  <ListItemStyle
                    key="1"
                    onClick={(e) => handleClick(e, "/home")}
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
                      onClose={(e) => handleClick(e)}
                      TransitionComponent={Fade}
                    >
                      <MenuItem onClick={(e) => handleClick(e, "/postVacancy")}>
                        Post Vacancy
                      </MenuItem>
                      <MenuItem onClick={(e) => handleClick(e, "/vacancies")}>
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
                      width: "max-content",
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
