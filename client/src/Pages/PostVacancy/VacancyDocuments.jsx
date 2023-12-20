import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  LinearProgress,
  Divider,
} from "@mui/material";
import { downloadHandler } from "../../components/DownloadIcon";
import { DescriptionOutlined } from "@mui/icons-material";
import { useState } from "react";

const Document = ({ fileName, path, body, children }) => {
  const [loading, setLoading] = useState(false);
  const fileNameUndefined = fileName ? false : true;
  const downloadDocumentHandler = async () => {
    setLoading(true);
    await downloadHandler({ fileName, path, body });
    setLoading(false);
  };
  return (
    <ListItem sx={{ flexDirection: "column" }}>
      <ListItemButton
        onClick={downloadDocumentHandler}
        disabled={loading || fileNameUndefined}
        sx={{ width: "100%" }}
      >
        <DescriptionOutlined
          sx={{
            mr: "0.5rem",
            ml: "-0.5rem",
            color: (theme) => theme.palette.primary[500],
          }}
        />
        {children}
      </ListItemButton>
      <LinearProgress
        sx={{ width: "100%", visibility: loading ? "initial" : "hidden" }}
      />
    </ListItem>
  );
};

const VacancyDocuments = ({ vacancy }) => {
  return (
    <Paper>
      <Typography
        sx={{
          textAlign: "center",
          m: "1rem auto",
          fontWeight: 600,
        }}
      >
        Documents
      </Typography>
      <List>
        <Document
          fileName="RPTScheduleDetails.pdf"
          path="/report/ApplicantsReport"
          body={{ vacancyId: vacancy?.VacancyId }}
        >
          Report Schedule
        </Document>
        <Divider variant="middle" />
        <Document
          fileName={vacancy?.AdvertisementPath}
          path="/download/pdfDownload"
          body={{ fileName: vacancy?.AdvertisementPath }}
        >
          Advertisement
        </Document>
      </List>
    </Paper>
  );
};

export default VacancyDocuments;
