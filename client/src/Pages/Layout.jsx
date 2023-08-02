import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import logo from "../Assets/WB_Logo.png";
import AdminPortalBanner from "../components/AdminPortalBanner";
import Navbar from "../components/Navbar";

const Layout = () => {
  const [isNavbar, setIsNavBar] = useState(false);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [active, setActive] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ position: "static" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
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
        {isNavbar ? (
          <Navbar
            active={active}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isNonMobile={isNonMobile}
          />
        ) : (
          <AdminPortalBanner />
        )}
      </Box>
      <Box>
        <Outlet context={[setIsNavBar, setActive]} />
      </Box>
    </Box>
  );
};

export default Layout;
