import {
  AppBar,
  Toolbar,
  useTheme,
  List,
  Box,
  IconButton,
  ListItem,
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
import { isTokenExpired } from "../utils/userValidation";
import { api } from "../state/api";

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
      handleLogOut();
    }
  });

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(api.util.resetApiState());
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
    <div
      style={{
        backgroundColor: theme.palette.background.main,
        paddingBottom: "2rem",
      }}
    >
      <AppBar
        sx={{
          position: "static",
          boxShadow: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          maxHeight: isNonMobile ? "50px" : "40px",
          width: "100%",
          backgroundColor: theme.palette.primary[500],
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
                    sx={{ fontWeight: 400, fontSize: "1rem" }}
                    onClick={(e) => handleClick(e, "/home")}
                  >
                    Home
                  </ListItemStyle>
                </ListItem>

                <ListItem role="none">
                  <ListItemStyle
                    key="2"
                    sx={{ fontWeight: 400, fontSize: "1rem" }}
                    onClick={handleMenuClick}
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
                        sx={{ fontWeight: 400, fontSize: "1rem" }}
                        onClick={(e) => handleClick(e, "/postVacancy")}
                      >
                        Post Vacancy
                      </ListItemStyle>
                    </ListItem>
                    <ListItem role="none">
                      <ListItemStyle
                        key="4"
                        sx={{ fontWeight: 400, fontSize: "1rem" }}
                        onClick={(e) => handleClick(e, "/vacancies")}
                      >
                        All Vacancies
                      </ListItemStyle>
                    </ListItem>
                  </span>
                )}

                <ListItem role="none">
                  <ListItemStyle
                    key="5"
                    sx={{ fontWeight: 400, fontSize: "1rem" }}
                    onClick={handleClick}
                  >
                    Profile
                  </ListItemStyle>
                </ListItem>

                <ListItem role="none">
                  <ListItemStyle
                    key="6"
                    onClick={handleLogOut}
                    sx={{
                      fontWeight: 400,
                      fontSize: "1rem",
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
              <List
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ display: "flex" }}>
                  <ListItemStyle
                    index="1"
                    active={active}
                    onClick={(e) => handleClick(e, "/home")}
                  >
                    Home
                  </ListItemStyle>

                  <ListItemStyle index="2" active={active} onClick={() => {}}>
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
                </span>
                <ListItemStyle index="3" active={active} onClick={() => {}}>
                  {user?.result?.UserName.split(" ")[0]}
                </ListItemStyle>

                {/* <ListItemStyle
                  index="4"
                  active={active}
                  onClick={() => handleLogOut()}
                >
                  Log out
                </ListItemStyle> */}
              </List>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
