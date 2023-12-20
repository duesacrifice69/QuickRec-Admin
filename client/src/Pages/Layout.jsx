import { useState } from "react";
import { Box, Toolbar, useMediaQuery, useScrollTrigger } from "@mui/material";
import { Outlet } from "react-router-dom";
import logo from "../Assets/WB_Logo.png";
import { AdminPortalBanner, ScrollTop, Navbar } from "../components";

const Layout = ({ auth }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 79,
  });
  const [active, setActive] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ position: "static" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Toolbar id="top" sx={{ p: { xs: 0 } }} />
          <Box
            component="img"
            alt="Company logo"
            src={logo}
            height={isNonMobile ? "60px" : "50px"}
            width={isNonMobile ? "400px" : "300px"}
            sx={{
              objectFit: "contain",
              m: "10px 0",
            }}
          ></Box>
        </Box>
        {!auth ? (
          <Navbar
            active={active}
            isSidebarOpen={isSidebarOpen}
            scrollTrigger={scrollTrigger}
            setIsSidebarOpen={setIsSidebarOpen}
            isNonMobile={isNonMobile}
          />
        ) : (
          <AdminPortalBanner />
        )}
      </Box>
      <Box
        sx={{
          pt: scrollTrigger && !auth ? 6.3 : 0,
          minHeight: "calc(100vh - 130px)",
          background: (theme) => theme.palette.background.main,
        }}
      >
        <Outlet context={[setActive]} />
        <ScrollTop />
      </Box>
    </Box>
  );
};

export default Layout;
