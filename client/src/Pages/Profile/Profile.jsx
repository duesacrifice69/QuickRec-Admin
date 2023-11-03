import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const [setActive] = useOutletContext();

  useEffect(() => setActive("4"), [setActive]);
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.main,
        textAlign: "center",
      }}
    >
      <Typography>Profile</Typography>
    </Box>
  );
};

export default Profile;
