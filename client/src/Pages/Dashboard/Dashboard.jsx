import { Box } from "@mui/material";
import Card from "../../components/CountUpCard";

const Dashboard = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.main,
        pb: "3rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Card count={100} title="Total Active Vacancies" />
        <Card count={25} title="Pending to Review" />
        <Card count={25} title="Pending to Review" />
        <Card count={25} title="Pending to Review" />
      </div>
    </Box>
  );
};

export default Dashboard;
