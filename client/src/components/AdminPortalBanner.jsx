import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AdminPortalBanner = () => {
  const theme = useTheme();
  const isNoneMobile = useMediaQuery("(min-width: 600px)");
  return (
    <Box
      height={isNoneMobile ? "50px" : "40px"}
      width="100%"
      backgroundColor={theme.palette.primary[500]}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
      }}
    >
      <Typography variant={isNoneMobile ? "h4" : "h5"} sx={{ fontWeight: 500 }}>
        Admin Portal
      </Typography>
    </Box>
  );
};

export default AdminPortalBanner;
