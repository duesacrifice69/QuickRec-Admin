import { Box, Container, Paper, Typography } from "@mui/material";
import Card from "../../components/CountUpCard";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetMasterDataQuery } from "../../state/api";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: masterData } = useGetMasterDataQuery();
  const [setActive] = useOutletContext();

  useEffect(() => setActive("1"), [setActive]);

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.main,
        pb: "3rem",
      }}
    >
      <Container maxWidth="lg">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Card
            count={masterData?.data?.dashboardData?.NoOfActiveVacancies}
            title="Total Active Vacancies"
          />
          <Card
            count={masterData?.data?.dashboardData?.NoOfPendingApplications}
            title="Pending to Review"
          />
          <Card count={25} title="Pending to Review" />
          <Card count={25} title="Pending to Review" />
        </div>
        <div style={{ display: "flex", marginTop: "2rem" }}>
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
          <Paper sx={{ width: "300px", p: "1rem 0.5rem" }}>
            <Typography sx={{ textAlign: "center" }}>
              Upcoming Interviews
            </Typography>
          </Paper>
        </div>
      </Container>
    </Box>
  );
};

export default Dashboard;
