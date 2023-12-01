import {
  AppBar,
  Toolbar,
  useTheme,
  List,
  Box,
  IconButton,
  Drawer,
  Typography,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemStyle from "./ListItemStyle";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../state/Auth";
import { useDispatch } from "react-redux";
import { isTokenExpired } from "../utils/userValidation";
import { api } from "../state/api";
import {
  AccountCircle,
  Assignment,
  ExpandLess,
  ExpandMore,
  Group,
  House,
  Logout,
  PostAdd,
  PendingActions,
} from "@mui/icons-material";
import ProfileAvatar from "./ProfileAvatar";
import userHasPermission from "../permissions";

const Navbar = ({
  active,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  scrollTrigger,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { UserName, UserRole } = useSelector(
    (state) => state.userContext.data.result
  );

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
  const handleMenuClick = () => {
    setOpen((o) => !o);
  };
  const handleClick = (navigateTo) => {
    !isNonMobile && setIsSidebarOpen(false);
    navigate(navigateTo);
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.main,
        paddingBottom: "2rem",
      }}
    >
      <AppBar
        position={scrollTrigger ? "fixed" : "static"}
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
                  overflowX: "hidden",
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
                  index="4"
                  active={active}
                  sx={{
                    marginRight: "-2rem",
                    " .MuiListItemButton-root": {
                      p: 0,
                      pr: "2.1rem",
                      height: "100%",
                    },
                  }}
                  subMenu={[
                    {
                      name: "User Profile",
                      icon: <AccountCircle />,
                      onClick: () => handleClick("/profile"),
                    },
                    {
                      name: "Log Out",
                      icon: <Logout />,
                      onClick: handleLogOut,
                    },
                  ]}
                >
                  <ProfileAvatar width="35px" />
                </ListItemStyle>
              </div>
              <Drawer
                variant="temporary"
                open={isSidebarOpen}
                onClose={() => {
                  setOpen(false);
                  setIsSidebarOpen((i) => !i);
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    backgroundColor: theme.palette.primary[500],
                    width: 205,
                  },
                }}
              >
                <ListItemStyle
                  index="1"
                  icon={<House />}
                  onClick={() => handleClick("/home")}
                >
                  Home
                </ListItemStyle>

                <ListItemStyle
                  index="2"
                  icon={<Group />}
                  onClick={handleMenuClick}
                >
                  Vacancy
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemStyle>
                <Collapse
                  in={open}
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary[400],
                  }}
                  timeout="auto"
                  unmountOnExit
                >
                  <ListItemStyle
                    icon={<PostAdd />}
                    onClick={() => handleClick("/postVacancy")}
                    sx={{ width: "100%" }}
                  >
                    Post Vacancy
                  </ListItemStyle>
                  <ListItemStyle
                    icon={<PendingActions />}
                    onClick={() => handleClick("/pendingVacancies")}
                    sx={{ width: "100%" }}
                  >
                    Pending Vacancies
                  </ListItemStyle>
                  <ListItemStyle
                    icon={<Group />}
                    onClick={() => handleClick("/vacancies")}
                    sx={{ width: "100%" }}
                  >
                    All Vacancies
                  </ListItemStyle>
                </Collapse>
                <ListItemStyle
                  index="3"
                  active={active}
                  icon={<Assignment />}
                  onClick={() => handleClick("/applications")}
                >
                  Applications
                </ListItemStyle>
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
                    icon={<House />}
                    onClick={() => handleClick("/home")}
                  >
                    Home
                  </ListItemStyle>

                  <ListItemStyle
                    index="2"
                    active={active}
                    icon={<Group />}
                    subMenu={[
                      {
                        name: "Post Vacancy",
                        icon: <PostAdd />,
                        onClick: () => handleClick("/postVacancy"),
                      },
                      {
                        name: "Pending Vacancies",
                        icon: <PendingActions />,
                        onClick: () => handleClick("/pendingVacancies"),
                      },
                      {
                        name: "All Vacancies",
                        icon: <Group />,
                        onClick: () => handleClick("/vacancies"),
                      },
                    ].filter((item) =>
                      userHasPermission({
                        userRole: UserRole,
                        permission: item.name,
                      })
                    )}
                  >
                    Vacancy
                  </ListItemStyle>
                  <ListItemStyle
                    index="3"
                    active={active}
                    icon={<Assignment />}
                    onClick={() => handleClick("/applications")}
                  >
                    Applications
                  </ListItemStyle>
                </div>
                <ListItemStyle
                  index="4"
                  active={active}
                  icon={<ProfileAvatar />}
                  subMenu={[
                    {
                      name: "User Profile",
                      icon: <AccountCircle />,
                      onClick: () => handleClick("/profile"),
                    },
                    {
                      name: "Log Out",
                      icon: <Logout />,
                      onClick: handleLogOut,
                    },
                  ]}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <Typography fontWeight={500}>
                      {UserName.split(" ")[0]}
                    </Typography>
                    <Typography fontSize={"0.7rem"}>{UserRole}</Typography>
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
