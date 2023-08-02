import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";

const PostVacancy = () => {
  const [setIsNavBar, setActive] = useOutletContext();
  const theme = useTheme();

  useEffect(() => setIsNavBar(true), []);
  useEffect(() => setActive("2"), []);
  return (
    <Paper sx={{ display: "flex" }}>
      <div>
        <h1>Post Vacancy</h1>
      </div>
    </Paper>
  );
};

export default PostVacancy;
