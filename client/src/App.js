import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Pages/Layout";
import SignIn from "./Pages/Auth/SignIn";
import VacancyList from "./Pages/Vacancies/VacancyList";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Applications from "./Pages/Applications/Applications";
import PostVacancy from "./Pages/PostVacancy/PostVacany";
import Application from "./Pages/Application/Application";

function App() {
  const user = useSelector((state) => state.userContext.data?.result);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route
          path="/"
          element={<Navigate to={user ? "/home" : "/signin"} replace />}
        />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/home" element={<Applications />} />
        <Route path="/applications/:id" element={<Application />} />
        <Route path="/vacancies" element={<VacancyList />} />
        <Route path="/postVacancy" element={<PostVacancy />} />
      </Route>
    )
  );
  return (
    <div>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
          <CssBaseline />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
