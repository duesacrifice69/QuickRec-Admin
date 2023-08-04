import { useTheme } from "@emotion/react";
import { DescriptionOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

const FileViewer = ({ label, onClick }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary[100],
        display: "flex",
        minWidth: "15vw",
        padding: "0.5rem",
        borderRadius: "5px",
        justifyContent: "space-between",
      }}
    >
      <Typography>{label}</Typography>
      <IconButton
        onClick={onClick}
        sx={{
          p: 0,
          height: "24px",
          color: theme.palette.primary[500],
        }}
      >
        <DescriptionOutlined />
      </IconButton>
    </Box>
  );
};

export default FileViewer;
