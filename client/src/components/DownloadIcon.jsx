import { IconButton, useTheme } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export const downloadHandler = async ({ fileName, path, body }) => {
  let res = await fetch(process.env.REACT_APP_BASE_URL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  let blob = await res.blob();
  const data = window.URL.createObjectURL(new Blob([blob]));
  const filename = res.headers.get("Content-Disposition");

  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", filename ?? fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};
const DownloadIcon = ({ fileName }) => {
  const theme = useTheme();

  return (
    <IconButton
      onClick={() =>
        downloadHandler({
          fileName: fileName,
          path: "/download/pdfDownload",
          body: {
            fileName: fileName,
          },
        })
      }
      disabled={fileName ? false : true}
      sx={{
        color: theme.palette.primary[500],
      }}
    >
      <DescriptionOutlinedIcon />
    </IconButton>
  );
};

export default DownloadIcon;
