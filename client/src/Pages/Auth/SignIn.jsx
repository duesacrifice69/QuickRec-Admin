import { useState } from "react";
import { Typography, Container, Paper, Grid } from "@mui/material";
import { Input, ButtonComp, Error } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserDataOnSuccess, getUserDataOnFailiure } from "../../state/Auth";
import api from "../../api/";

const initState = { userName: "", password: "" };

const SignIn = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState(initState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = await api.signin(loginData);
      localStorage.setItem("profile", data.token);
      dispatch(getUserDataOnSuccess());
      navigate("/home");
      setLoading(false);
    } catch (error) {
      dispatch(getUserDataOnFailiure(error?.response?.data));
      setError(error.response?.data?.message);
      console.log(error?.response?.data);
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ pt: "2rem" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: "1rem",
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
              type="password"
            />
            <Grid item xs={12}>
              <ButtonComp
                type="submit"
                sx={{ mb: error ? "auto" : "-2rem" }}
                fullWidth
                loading={loading}
              >
                Sign In
              </ButtonComp>
            </Grid>
            <Error error={error} setError={setError} />
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
