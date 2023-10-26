import { Box, Typography, useTheme } from "@mui/material";
import CountUp from "react-countup";

const CountUpCard = ({ count, title }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        borderTopRightRadius: "30px",
        borderBottomLeftRadius: "30px",
        width: "200px",
        textAlign: "center",
        padding: "1rem 0.75rem",
        boxShadow: (theme) => `10px 10px 10px ${theme.palette.secondary.main}`,
      }}
    >
      <CountUp
        style={{
          color: theme.palette.primary[500],
          fontWeight: 900,
          fontSize: "2rem",
        }}
        end={count}
        delay={0}
      />
      <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
    </Box>
  );
};

export default CountUpCard;
