import {
  AppBar,
  Toolbar,
  useTheme,
  List,
  Box,
  IconButton,
  Drawer,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListItemStyle from "./ListItemStyle";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../state/Auth";
import { useDispatch } from "react-redux";
import { isTokenExpired } from "../utils/userValidation";
import { api } from "../state/api";
import { Group, House } from "@mui/icons-material";
import ProfilePic from "./ProfilePic";

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
        position="static"
        sx={{
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
          id="nav"
          sx={{
            alignItems: "center",
            display: "flex",
            width: "100%",
          }}
        >
          {!isNonMobile ? (
            <Box sx={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <ListItemStyle
                  index="3"
                  active={active}
                  subMenu={[
                    { name: "User Profile", onClick: () => {} },
                    { name: "Log Out", onClick: handleLogOut },
                  ]}
                >
                  <ProfilePic name={user?.result?.UserName} />
                </ListItemStyle>
              </div>
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
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    backgroundColor: theme.palette.primary[500],
                  },
                }}
              >
                <ListItemStyle
                  index="1"
                  onClick={(e) => handleClick(e, "/home")}
                >
                  Home
                </ListItemStyle>

                <ListItemStyle index="2" onClick={handleMenuClick}>
                  Vacancy
                  <KeyboardArrowDownIcon sx={{ pl: "5px" }} />
                </ListItemStyle>
                {anchorEl && (
                  <div style={{ backgroundColor: theme.palette.primary[400] }}>
                    <ListItemStyle
                      index="3"
                      onClick={(e) => handleClick(e, "/postVacancy")}
                    >
                      Post Vacancy
                    </ListItemStyle>
                    <ListItemStyle
                      index="4"
                      onClick={(e) => handleClick(e, "/vacancies")}
                    >
                      All Vacancies
                    </ListItemStyle>
                  </div>
                )}
              </Drawer>
            </Box>
          ) : (
            <Box
              component="nav"
              sx={{
                width: "100%",
              }}
            >
              <List
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex" }}>
                  <ListItemStyle
                    index="1"
                    active={active}
                    onClick={(e) => handleClick(e, "/home")}
                  >
                    <House sx={{ mr: "0.5rem" }} />
                    Home
                  </ListItemStyle>

                  <ListItemStyle
                    index="2"
                    active={active}
                    subMenu={[
                      {
                        name: "Post Vacancy",
                        onClick: (e) => handleClick(e, "/postVacancy"),
                      },
                      {
                        name: "All Vacancies",
                        onClick: (e) => handleClick(e, "/vacancies"),
                      },
                    ]}
                  >
                    <Group sx={{ mr: "0.5rem" }} />
                    Vacancy
                  </ListItemStyle>
                </div>
                <ListItemStyle
                  index="3"
                  active={active}
                  subMenu={[
                    { name: "User Profile", onClick: () => {} },
                    { name: "Log Out", onClick: handleLogOut },
                  ]}
                >
                  <ProfilePic name={user?.result?.UserName} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <Typography fontWeight={600}>
                      {user?.result?.UserName.split(" ")[0]}
                    </Typography>
                    <Typography fontSize={"0.7rem"}>
                      {user?.result?.UserRole}
                    </Typography>
                  </div>
                </ListItemStyle>
              </List>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
