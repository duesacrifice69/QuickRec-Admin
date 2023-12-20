import { useState } from "react";
import { useSelector } from "react-redux";
import { Input, Error, ButtonComp } from "../../components";
import api from "../../api";
import { Box, Paper } from "@mui/material";
const initState = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ChangePassword = () => {
  const { UserId } = useSelector((state) => state.userContext.data.result);
  const [passwordChangeData, setPasswordChangeData] = useState(initState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const confirmPasswordMatches =
    passwordChangeData.confirmNewPassword.length === 0 ||
    passwordChangeData.newPassword === passwordChangeData.confirmNewPassword;
  const handleChange = (e) => {
    setPasswordChangeData({
      ...passwordChangeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.changePassword({
        userId: UserId,
        currentPassword: passwordChangeData.currentPassword,
        newPassword: passwordChangeData.newPassword,
      });
      setPasswordChangeData(initState);
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data);
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          m: { xs: "2rem 1.25rem", sm: "3rem" },
          p: "2rem",
          maxWidth: "max-content",
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
          loading={loading}
          align="center"
          sx={{
            p: { xs: "0.6rem 1rem", sm: "1rem 1rem" },
            mt: "3rem",
          }}
        >
          Change Password
        </ButtonComp>
        <Error error={error} setError={setError} />
      </Paper>
    </Box>
  );
};

export default ChangePassword;
