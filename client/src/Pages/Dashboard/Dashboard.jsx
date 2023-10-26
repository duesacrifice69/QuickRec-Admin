import { Box, Container } from "@mui/material";
import Card from "../../components/CountUpCard";
import { BarChart } from "@mui/x-charts/BarChart";

const Dashboard = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.main,
        pb: "3rem",
      }}
    >
      <Container maxWidth="lg">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Card count={100} title="Total Active Vacancies" />
          <Card count={25} title="Pending to Review" />
          <Card count={25} title="Pending to Review" />
          <Card count={25} title="Pending to Review" />
        </div>
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={500}
          height={300}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;
