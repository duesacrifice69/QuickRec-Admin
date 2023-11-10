import { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../components/Input";
import ButtonComp from "../../components/ButtonComp";
import api from "../../api";
import Error from "../../components/Error";
import { Box, Container, Paper } from "@mui/material";
const initState = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ChangePassword = () => {
  const { UserId } = useSelector((state) => state.userContext.data.result);
  const [passwordChangeData, setPasswordChangeData] = useState(initState);
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
    try {
      const response = await api.changePassword({
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
    <Paper
      sx={{
        m: "auto",
        p: "2rem",
        // width: "100%",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      {/* <Container maxWidth="md" sx={{ ml: 0 }}> */}
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
      {/* </Container> */}
    </Paper>
  );
};

export default ChangePassword;
