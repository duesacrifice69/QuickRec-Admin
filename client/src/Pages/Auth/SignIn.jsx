import { useState } from "react";
import { Typography, Container, Paper, Grid } from "@mui/material";
import Input from "../../components/Input";
import ButtonComp from "../../components/ButtonComp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserDataOnSuccess, getUserDataOnFailiure } from "../../state/Auth";
import * as api from "../../api/";

const initState = { userName: "", password: "" };

const SignIn = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState(initState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleShowPassowrd = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await api.signin(loginData);
      localStorage.setItem("profile", data.token);
      dispatch(getUserDataOnSuccess());
      navigate("/home");
    } catch (error) {
      dispatch(getUserDataOnFailiure(error.response.data));
      setError(error.response.data);
      console.log(error.response.data);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
        elevation={0}
        variant="outlined"
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: "1rem" }}>
            <Input
              name="userName"
              label="Email Address/ Employee No *"
              handleChange={handleChange}
              required
            />
            <Input
              name="password"
              label="Password *"
              handleChange={handleChange}
              required
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassowrd}
            />
            <Grid item xs={12}>
              <ButtonComp type="submit" fullWidth variant="contained">
                Sign In
              </ButtonComp>
            </Grid>
          </Grid>
          {error && (
            <Typography
              sx={{
                fontSize: "0.8rem",
                m: "1rem",
                p: "1rem",
                color: "#ff0000",
                border: "1px solid red",
                borderRadius: "5px",
              }}
            >
              {error.message}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
