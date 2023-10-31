import { Box } from "@mui/material";

const ProfilePic = ({ name }) => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.main,
        color: (theme) => theme.palette.secondary[900],
        border: (theme) => "1px solid " + theme.palette.secondary[600],
        width: "2rem",
        fontSize: "1rem",
        height: "2rem",
        borderRadius: "50%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      {name.split(" ").length > 1
        ? name.slice(0, 2).toUpperCase()
        : name.slice(0, 1).toUpperCase()}
    </Box>
  );
};

export default ProfilePic;
