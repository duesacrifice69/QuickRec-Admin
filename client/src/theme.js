import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      100: "#d6e4f1",
      200: "#adcae2",
      300: "#85afd4",
      400: "#5c95c5",
      500: "#337ab7",
      600: "#296292",
      700: "#1f496e",
      800: "#143149",
      900: "#0a1825",
    },
    secondary: {
      main: "#D9D9D9",
      100: "#f7f7f7",
      200: "#efefef",
      300: "#e7e7e7",
      400: "#dfdfdf",
      500: "#d7d7d7",
      600: "#acacac",
      700: "#818181",
      800: "#565656",
      900: "#2b2b2b",
    },
    light: {
      main: "#F9F9F9",
    },
    background: {
      main: "#F6F8FB",
    },
  },
});

export default theme;
