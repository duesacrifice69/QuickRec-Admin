import { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import ProfileAvatar from "../../components/ProfileAvatar";
import Input from "../../components/Input";
import ButtonComp from "../../components/ButtonComp";
import * as API from "../../api/index.js";
import Error from "../../components/Error";
import { useSelector } from "react-redux";
import permissions from "../../permissions.js";

const initState = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const sections = ["View Profile", "Change Password", "Manage Users"];

const Profile = () => {
  const [setActive] = useOutletContext();
  const { UserId, UserRole } = useSelector(
    (state) => state.userContext.data.result
  );
  const [activeSection, setActiveSection] = useState(0);
  const [error, setError] = useState();
  const [passwordChangeData, setPasswordChangeData] = useState(initState);
  const confirmPasswordMatches =
    passwordChangeData.confirmNewPassword.length === 0 ||
    passwordChangeData.newPassword === passwordChangeData.confirmNewPassword;

  useEffect(() => setActive("4"), [setActive]);

  const handleChange = (e) => {
    setPasswordChangeData({
      ...passwordChangeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.changePassword({
        userId: UserId,
        currentPassword: passwordChangeData.currentPassword,
        newPassword: passwordChangeData.newPassword,
      });
      setError(response?.message);
      setPasswordChangeData(initState);
    } catch (error) {
      console.log(error?.response?.data);
      setError(error?.response?.data?.message);
    }
  };

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
          display: "flex",
          flexDirection: "column",
          minWidth: "200px",
          minHeight: "calc(100vh - 130px)",
          backgroundColor: (theme) => theme.palette.primary[400],
        }}
      >
        {sections
          .filter(
            (section) =>
              !permissions
                .find((user) => user.role === UserRole)
                .profile.includes(section)
          )
          .map((section, i) => (
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
                  fontSize: "1rem",
                  borderRadius: 0,
                  color: (theme) =>
                    i === activeSection
                      ? theme.palette.primary[500]
                      : "#ffffff",
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
      {activeSection === 0 && (
        <Box>
          <ProfileAvatar />
          <Typography>View Profile</Typography>
        </Box>
      )}
      {activeSection === 1 && (
        <Paper
          sx={{
            m: "1rem 2rem",
            p: "1.5rem",
            width: "100%",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              maxWidth: "400px",
            }}
          >
            <Input
              label="Current Password *"
              type="password"
              name="currentPassword"
              value={passwordChangeData.currentPassword}
              handleChange={handleChange}
              required
            />
            <Input
              label="New Password *"
              type="password"
              name="newPassword"
              value={passwordChangeData.newPassword}
              handleChange={handleChange}
              required
            />
            <Input
              label="Confirm New Password *"
              type="password"
              name="confirmNewPassword"
              value={passwordChangeData.confirmNewPassword}
              handleChange={handleChange}
              error={!confirmPasswordMatches}
              helperText={!confirmPasswordMatches && "Password doesn't match."}
              required
            />
          </Box>
          <ButtonComp
            type="submit"
            disabled={!confirmPasswordMatches}
            sx={{ display: "block", p: "1rem", m: "3rem auto" }}
          >
            Change Password
          </ButtonComp>
          <Error error={error} setError={setError} />
        </Paper>
      )}
      {activeSection === 2 && (
        <Box>
          <Typography>Manage Users</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
