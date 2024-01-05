import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import { useSelector } from "react-redux";
import ManageUsers from "./ManageUsers";

const sections = ["Change Password"];

const Profile = () => {
  const [setActive] = useOutletContext();
  const { Permissions } = useSelector((state) => state.userContext.data.result);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (Permissions.manage_users && !sections.includes("Manage Users")) {
      sections.push("Manage Users");
    } else if (!Permissions.manage_users && sections.includes("Manage Users")) {
      sections.pop();
    }
  }, [Permissions]);

  useEffect(() => setActive("4"), [setActive]);

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.main,
        display: "flex",
        mt: "-2rem",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          minWidth: { sm: "200px", md: "250px" },
          minHeight: "calc(100vh - 130px)",
          backgroundColor: (theme) => theme.palette.primary[400],
        }}
      >
        {sections.map((section, i) => (
          <Box sx={{ display: "flex" }} key={i}>
            {activeSection === i && (
              <Box
                sx={{
                  width: "0.5rem",
                  height: "100%",
                  backgroundColor: (theme) => theme.palette.primary[500],
                }}
              />
            )}
            <Button
              sx={{
                pt: "1.5rem",
                pb: "1.5rem",
                width: "100%",
                fontWeight: 600,
                fontSize: { md: "1rem", sm: "0.8rem" },
                borderRadius: 0,
                color: (theme) =>
                  i === activeSection ? theme.palette.primary[500] : "#ffffff",
                backgroundColor: (theme) =>
                  i === activeSection
                    ? theme.palette.background.main
                    : theme.palette.primary[400],
                "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
              }}
              onClick={() => setActiveSection(i)}
            >
              {section}
            </Button>
          </Box>
        ))}
      </Box>
      {activeSection === 0 && <ChangePassword />}
      {Permissions.manage_users && activeSection === 1 && <ManageUsers />}
    </Box>
  );
};

export default Profile;
