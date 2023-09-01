import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import DownloadIcon from "./DownloadIcon";

const FileViewer = ({ label, fileName }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary[100],
        minWidth: "15vw",
        p: 0,
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>{label}</Typography>
      <DownloadIcon fileName={fileName} />
    </Box>
  );
};

export default FileViewer;
