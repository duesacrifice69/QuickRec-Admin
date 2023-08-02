import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";

const Applications = () => {
  const [setIsNavBar, setActive] = useOutletContext();
  const theme = useTheme();

  useEffect(() => setIsNavBar(true), []);
  useEffect(() => setActive("1"), []);

  return (
    <Paper sx={{ display: "flex" }}>
      <div>
        <h1>Applications</h1>
      </div>
    </Paper>
  );
};

export default Applications;
